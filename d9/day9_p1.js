import { d9_data, d9_test_data } from "./input.js";

// https://adventofcode.com/2021/day/9

dayNine(d9_test_data);
dayNine(d9_data);

function dayNine(data) {
    const emptyGrid = getEmptyGrid(data.length, data[0].length);
    findLowestPoints(data, emptyGrid);
    let riskLevelSum = 0;
    for (let i = 0; i < emptyGrid.length; i++) {
        for (let j = 0; j < emptyGrid[i].length; j++) {
            if (!emptyGrid[i][j]) continue;
            const cellValue = +data[i][j];
            const riskLevel = 1 + cellValue;
            riskLevelSum += riskLevel;
        }
    }
    console.log(riskLevelSum);
}

function findLowestPoints(data, emptyGrid) {
    for (let i = 0; i < data.length; i++) {
        const row = data[i];
        for (let j = 0; j < row.length; j++) {
            const currentCell = +row[j];
            const top = data[i - 1]?.[j] != null ? +data[i - 1]?.[j] : null;
            const bottom = data[i + 1]?.[j] != null ? +data[i + 1]?.[j] : null;
            const left = data[i][j - 1] != null ? +data[i][j - 1] : null;
            const right = data[i][j + 1] != null ? +data[i][j + 1] : null;
            const adjacentCells = { top, bottom, left, right };
            const isLowest = isCurrentLowest();
            if (isLowest) emptyGrid[i][j] = true;

            function isCurrentLowest() {
                return (currentCell < adjacentCells.top || adjacentCells.top == null) &&
                    (currentCell < adjacentCells.bottom || adjacentCells.bottom == null) &&
                    (currentCell < adjacentCells.left || adjacentCells.left == null) &&
                    (currentCell < adjacentCells.right || adjacentCells.right == null);
            }
        }
    }
}

function getEmptyGrid(columnLength, cellLength) {
    return Array.from({ length: columnLength }, () => new Array(cellLength).fill(false));
}