import { d9_data, d9_test_data } from "./input.js";

// https://adventofcode.com/2021/day/9

dayNine(d9_test_data);
// dayNine(d9_data);

function dayNine(data) {
    const emptyGrid = getEmptyGrid(data.length, data[0].length);
    findLowestPoints(data, emptyGrid);
    const result = getBasins(data, emptyGrid);
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

function getBasins(data, emptyGrid) {
    let basinLength = 0;
    for (let i = 0; i < emptyGrid.length; i++) {
        for (let j = 0; j < emptyGrid[i].length; j++) {
            if (!emptyGrid[i][j]) continue;
            const basin = getBasin(data,i,j);
            basinLength = basin.length;
        }
    }
    return basinLength
}

function getBasin(data, i, j) {
    const { cellValue, adjacentCells } = getCellAndAdjacentValues(data, i, j)
    
}

function getEmptyGrid(columnLength, cellLength) {
    return Array.from({ length: columnLength }, () => new Array(cellLength).fill(false));
}