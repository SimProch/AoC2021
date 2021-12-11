import { d11_data, d11_test_data } from "./input.js";

// https://adventofcode.com/2021/day/11

const INCREMENTING_OBJECT = getIncrementingObj();
// dayEleven(d11_test_data);
dayEleven(d11_data);

function dayEleven(stringData) {
    const data = transformData(stringData);
    const numberOfCells = data.reduce((x,y) => x + y.length, 0);
    let i = 0;
    let isSynced = false;
    while (!isSynced) {
        traverseGrid(data)
        i++;
    }

    console.log(data);
    console.log(i);

    function traverseGrid(data) {
        const positionsToIncrementNear = new Map();
        const positionsToReset = new Map();
        incrementAll();

        positionsToIncrementNear.forEach(key => {
            const y = +key[0];
            const x = +key[1];
            incrementNearCells(x, y);
        })


        let numberOfCurrentFlashes = 0;
        positionsToReset.forEach(key => {
            const y = +key[0];
            const x = +key[1];
            data[y][x] = 0;
            numberOfCurrentFlashes++;
        })
        if (numberOfCurrentFlashes == numberOfCells) isSynced = true;

        function incrementNearCells(x, y) {
            Object.values(INCREMENTING_OBJECT).forEach(fn => {
                const nearCell = fn(data, x, y);
                if (nearCell.value > 9) {
                    positionsToReset.set(`${nearCell.y}${nearCell.x}`, `${nearCell.y}${nearCell.x}`);
                    positionsToIncrementNear.set(`${nearCell.y}${nearCell.x}`, `${nearCell.y}${nearCell.x}`);
                }
            });
        }

        function incrementAll() {
            for (let y = 0; y < data.length; y++) {
                for (let x = 0; x < data[y].length; x++) {
                    data[y][x]++;
                    if (data[y][x] > 9) {
                        positionsToIncrementNear.set(`${y}${x}`, `${y}${x}`);
                        positionsToReset.set(`${y}${x}`, `${y}${x}`);
                    }
                }
            }
        }
    }
}

function getIncrementingObj() {
    const incrementingObj = {
        top: (data, x, y) => {
            if (data[y - 1]?.[x] != null) data[y - 1][x]++;
            return { value: data[y - 1]?.[x], y: y - 1, x: x }
        },
        bottom: (data, x, y) => {
            if (data[y + 1]?.[x] != null) data[y + 1][x]++;
            return { value: data[y + 1]?.[x], y: y + 1, x: x }
        },
        right: (data, x, y) => {
            if (data[y][x + 1] != null) data[y][x + 1]++;
            return { value: data[y][x + 1], y: y, x: x + 1 }
        },
        left: (data, x, y) => {
            if (data[y][x - 1] != null) data[y][x - 1]++;
            return { value: data[y][x - 1], y: y, x: x - 1 }
        },
        diagonalTopLeft: (data, x, y) => {
            if (data[y - 1]?.[x - 1] != null) data[y - 1][x - 1]++;
            return { value: data[y - 1]?.[x - 1], y: y - 1, x: x - 1 }
        },
        diagonalTopRight: (data, x, y) => {
            if (data[y - 1]?.[x + 1] != null) data[y - 1][x + 1]++;
            return { value: data[y - 1]?.[x + 1], y: y - 1, x: x + 1 }
        },
        diagonalBottomLeft: (data, x, y) => {
            if (data[y + 1]?.[x - 1] != null) data[y + 1][x - 1]++;
            return { value: data[y + 1]?.[x - 1], y: y + 1, x: x - 1 }
        },
        diagonalBottomRight: (data, x, y) => {
            if (data[y + 1]?.[x + 1] != null) data[y + 1][x + 1]++;
            return { value: data[y + 1]?.[x + 1], y: y + 1, x: x + 1 }
        }
    }
    return incrementingObj
}

function transformData(stringData) {
    return stringData.map(datum => datum.split("").map(i => +i));
}