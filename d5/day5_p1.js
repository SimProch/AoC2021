import { d5_data } from "./input.js";

dayFive(d5_data)
// https://adventofcode.com/2021/day/5
const data = [
    [[0, 9], [5, 9]],
    [[8, 0], [0, 8]],
    [[9, 4], [3, 4]],
    [[2, 2], [2, 1]],
    [[7, 0], [7, 4]],
    [[6, 4], [2, 0]],
    [[0, 9], [2, 9]],
    [[3, 4], [1, 4]],
    [[0, 0], [8, 8]],
    [[5, 5], [8, 2]]
]

function dayFive(data) {
    const rangeData = getRangeData(data);
    const minMax = getMinMax(rangeData);
    const grid = getGrid(minMax.max);
    fillGrid();
    const count = getNumberOfOverlappingElements()
    console.log(count);

    function getNumberOfOverlappingElements() {
        return grid.reduce((previous, row) => {
            const overlapping = row.filter(i => i >= 2).length;
            return previous + overlapping;
        }, 0);
    }

    function fillGrid() {
        rangeData.forEach(range => {
            const fromX = range.fromX;
            const toX = range.toX;
            const fromY = range.fromY;
            const toY = range.toY;
            if (fromX === toX) {
                const x = fromX;
                const smaller = fromY < toY ? fromY : toY;
                const higher = fromY > toY ? fromY : toY;
                for (let y = smaller; y <= higher; y++) {
                    grid[y][x]++;
                }
            }
            if (fromY === toY) {
                const y = fromY;
                const smaller = fromX < toX ? fromX : toX;
                const higher = fromX > toX ? fromX : toX;
                for (let x = smaller; x <= higher; x++) {
                    grid[y][x]++;
                }
            }
        });
    }
}


function getMinMax(data) {
    const allFromX = data.map(i => i.fromX);
    const allFromY = data.map(i => i.fromY);
    const allToX = data.map(i => i.toX);
    const allToY = data.map(i => i.toY);
    const items = Array.from(
        new Set(
            [...allFromX, ...allFromY, ...allToX, ...allToY]
        )
    );
    const min = Math.min(...items);
    const max = Math.max(...items);
    return { min, max };
}

function getRangeData(data) {
    return data.map(lineRange => {
        const from = lineRange[0];
        const to = lineRange[1];
        const fromX = from[0];
        const fromY = from[1];
        const toX = to[0];
        const toY = to[1];
        return {
            fromX, fromY, toX, toY
        }
    })
}

function getGrid(size) {
    const getInnerGrid = () => new Array(size + 1).fill(0);
    return new Array(size + 1).fill(0).map(i => getInnerGrid());
}



dayFive(data);
