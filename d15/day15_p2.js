import { d15_data, d15_data_v2, d15_test_data, d15_test_data_v2 } from "./input.js";

// https://adventofcode.com/2021/day/15

dayFifteen(d15_test_data);
dayFifteen(d15_test_data_v2);
dayFifteen(d15_data);
dayFifteen(d15_data_v2);

function dayFifteen(data) {
    const { columnSize, cumulativeGrid, rowSize } = initGridValues(data);
    fillGridWithCumulativeValues(columnSize, cumulativeGrid, data, rowSize);
    console.log(cumulativeGrid[cumulativeGrid.length - 1][cumulativeGrid[0].length - 1])
}

function initGridValues(data) {
    const columnSize = data.length;
    const rowSize = data[0].length;
    const cumulativeGrid = new Array(columnSize).fill(false).map(i => new Array(rowSize).fill(0));
    return { columnSize, cumulativeGrid, rowSize };
}

function fillGridWithCumulativeValues(columnSize, cumulativeGrid, data, rowSize) {
    cumulativeGrid[1][0] = +data[1][0]
    cumulativeGrid[0][1] = +data[0][1]
    for (let i = 1; i < columnSize; i++) {
        cumulativeGrid[i][0] = +cumulativeGrid[i - 1][0] + +data[i][0];
    }

    for (let i = 1; i < rowSize; i++) {
        cumulativeGrid[0][i] = +cumulativeGrid[0][i - 1] + +data[0][i];
    }

    for (let i = 1; i < columnSize; i++) {
        for (let j = 1; j < rowSize; j++) {
            const minimumPreviousValue = Math.min(+cumulativeGrid[i - 1][j], +cumulativeGrid[i][j - 1]);
            const nodeValue = minimumPreviousValue + (+data[i][j]);
            cumulativeGrid[i][j] = nodeValue;
        }
    }
}

