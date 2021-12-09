import { d9_data, d9_test_data } from "./input.js";

// https://adventofcode.com/2021/day/9

// dayNine(d9_test_data);
dayNine(d9_data);

function dayNine(data) {
    const emptyGrid = getEmptyGrid(data.length, data[0].length);
    findLowestPoints(data, emptyGrid);
    const basinLengths = getBasinLengths(data, emptyGrid).sort((x,y) => y - x)
    const [first, second, third, ...rest] = basinLengths;
    const result = first * second * third;
    console.log(result);
}

function findLowestPoints(data, emptyGrid) {
    for (let i = 0; i < data.length; i++) {
        const row = data[i];
        for (let j = 0; j < row.length; j++) {
            const { cellValue, adjacentCells } = getCellAndAdjacentValues(data, i, j)
            const isLowest = isCurrentLowest(cellValue, adjacentCells);
            if (isLowest) emptyGrid[i][j] = true;
        }
    }
}

function getCellAndAdjacentValues(data, columnIndex, rowIndex) {
    if (data[columnIndex]?.[rowIndex] == null) return { cellValue: null, adjacentCells: null}
    const cellValue = +data[columnIndex][rowIndex];
    const top = data[columnIndex - 1]?.[rowIndex] != null ? +data[columnIndex - 1]?.[rowIndex] : null;
    const bottom = data[columnIndex + 1]?.[rowIndex] != null ? +data[columnIndex + 1]?.[rowIndex] : null;
    const left = data[columnIndex][rowIndex - 1] != null ? +data[columnIndex][rowIndex - 1] : null;
    const right = data[columnIndex][rowIndex + 1] != null ? +data[columnIndex][rowIndex + 1] : null;
    const adjacentCells = { top, bottom, left, right };
    return { cellValue, adjacentCells };
}

function isCurrentLowest(currentCell, adjacentCells) {
    return (currentCell < adjacentCells.top || adjacentCells.top == null) &&
        (currentCell < adjacentCells.bottom || adjacentCells.bottom == null) &&
        (currentCell < adjacentCells.left || adjacentCells.left == null) &&
        (currentCell < adjacentCells.right || adjacentCells.right == null);
}

function getBasinLengths(data, emptyGrid) {
    let basinLengths = []
    for (let i = 0; i < emptyGrid.length; i++) {
        for (let j = 0; j < emptyGrid[i].length; j++) {
            if (!emptyGrid[i][j]) continue;
            const coordinates = []
            const basinLength = getBasinLength(data,i,j, coordinates);
            basinLengths.push(basinLength);
        }
    }
    return basinLengths
}

function getBasinLength(data, i, j, coordinates) {
    let count = 1;
    const { cellValue, adjacentCells } = getCellAndAdjacentValues(data, i, j)
    coordinates.push([j, i])
    if (cellValue == null) return 0;
    if (goTo(adjacentCells.top, i - 1, j, coordinates)) count += getBasinLength(data,i - 1, j, coordinates);
    if (goTo(adjacentCells.bottom, i + 1, j, coordinates)) count += getBasinLength(data,i + 1, j, coordinates);
    if (goTo(adjacentCells.left, i, j - 1, coordinates)) count += getBasinLength(data,i, j - 1, coordinates);
    if (goTo(adjacentCells.right, i, j + 1, coordinates)) count += getBasinLength(data,i, j + 1, coordinates);
    return count;
}

function goTo(adjacentCell, i, j, coordinates) {
    if (adjacentCell == null) return false;
    if (adjacentCell === 9) return false;
    const alreadyAdded = coordinates.find(coord => coord[0] === j && coord[1] === i);
    if (alreadyAdded) return false;
    return true;
}

function getEmptyGrid(columnLength, cellLength) {
    return Array.from({ length: columnLength }, () => new Array(cellLength).fill(false));
}