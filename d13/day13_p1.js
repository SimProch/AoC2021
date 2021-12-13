import { d13_data, d13_test_data, d13_test_fold, d13_fold } from "./input.js";

// https://adventofcode.com/2021/day/13

dayThirteen(d13_test_data, d13_test_fold);
dayThirteen(d13_data, d13_fold.slice(0, 1));

function dayThirteen(data, fold) {
    const transformedData = data.map(i => i.split(","));
    let grid = getEmptyGrid(transformedData)
    fillGrid(transformedData, grid);
    grid = foldGrid(grid, fold);
    const visibleDots = getVisibleDots(grid);
    console.log(visibleDots);
    return visibleDots;
}

function getEmptyGrid(data) {
    const xMax = Math.max(...data.map(i => i[0]))
    const yMax = Math.max(...data.map(i => i[1]))
    return new Array(yMax + 1).fill(false).map(i => {
        const arr = new Array(xMax + 1).fill(false);
        return arr;
    })
}

function fillGrid(data, grid) {
    for (let i = 0; i < data.length; i++) {
        const coords = data[i];
        const x = coords[0];
        const y = coords[1];
        grid[y][x] = true;
    }
}

function foldGrid(grid, fold) {
    // for (let i = 0; i < fold.length; i++) {
    doSingleFold(0);
    // }
    return grid;

    function doSingleFold(i) {
        const currentFold = fold[i];
        const foldOnY = currentFold["y"] != null;
        if (foldOnY) doFoldOnY(currentFold);
        else doFoldOnX(currentFold);
    }

    function doFoldOnY(currentFold) {
        const sliceFrom = currentFold["y"];
        const toFoldOver = grid.slice(sliceFrom).slice(1).reverse();
        grid = grid.slice(0, sliceFrom);
        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[y].length; x++) {
                if (toFoldOver[y][x]) grid[y][x] = toFoldOver[y][x];
            }
        }
    }

    function doFoldOnX(currentFold) {
        const sliceFrom = currentFold["x"];
        for (let y = 0; y < grid.length; y++) {
            const toFoldOver = grid[y].slice(sliceFrom).slice(1).reverse();
            grid[y] = grid[y].slice(0, sliceFrom);
            for (let x = 0; x < grid[y].length; x++) {
                if (toFoldOver[x]) grid[y][x] = toFoldOver[x];
            }
        }
    }
}

function getVisibleDots(grid) {
    let count = 0;
    for (let i = 0; i < grid.length; i++) {
        count += grid[i].reduce((x, y) => x + !!y, 0)
    }
    return count;
}