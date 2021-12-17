import { d17_data, d17_data_test } from "./input.js";

// https://adventofcode.com/2021/day/17
function assert(a,b) { 
    if (a !== b) console.error("didnt pass");
};

assert(daySeventeen(d17_data_test), 45);
console.log(daySeventeen(d17_data));

function daySeventeen(data) {
    const { x, y } = data;
    const grid = createGrid(x, y);
    const hits = getShots();
    const highestVelocities = hits.map(([velocity, angle]) => shootAtTarget(velocity, angle)).filter(i => i !== false);
    return Math.max(...highestVelocities);

    function shootAtTarget(velocity, angle) {
        const numberOfIterations = velocity;
        let max = 0;
        let x = 0;
        let y = 0;
        let isTargetHit = false;
        for (let i = 0; i < numberOfIterations; i++) {
            x += velocity;
            if (velocity > 0) velocity--;
            y -= angle;
            angle--
            if (y < max) max = y;
            isTargetHit = targetGotHit(x, y);
            if (isTargetHit) break;
        }
        while (y < grid.length && !isTargetHit) {
            y -= angle;
            if (y < max) max = y;
            angle--;
            isTargetHit = targetGotHit(x, y);
        }
        return isTargetHit ? Math.abs(max) : false

    }

    function targetGotHit(x, y) {
        return grid[y]?.[x];
    }

    function getShots() {
        const xs = Array.from({ length: x.to}, (_,i) => i);
        const ys = Array.from({ length: Math.abs(y.from)}, (_,i) => i);
        let result = [];
        for (let i = 0; i < xs.length; i++) {
            for (let j = 0; j < ys.length; j++) {
                result.push([xs[i], ys[j]]);
            }
        }
        
        return result;
    }
}

function createGrid(x, y) {
    const fromX = x.from;
    const toX = x.to;
    const fromY = y.from;
    const toY = y.to;
    const isXPositive = fromX > -1 && toX > -1
    const isYPositive = fromY > -1 && toY > -1;
    const columns = getGridColumns();
    const grid = columns.map(i => getGridRows());
    setTarget();
    return grid;

    function getGridColumns() {
        if (isYPositive) return new Array(toY + 1).fill(false)
        return new Array(Math.abs(fromY - 1)).fill(false);
    }

    function getGridRows() {
        if (isXPositive) return new Array(Math.abs(toX + 1)).fill(false);
        return new Array(Math.abs(fromX - 1)).fill(false);
    }

    function setTarget() {
        const absFromY = Math.abs(fromY);
        const absToY = Math.abs(toY);
        for (let y = absFromY; y >= absToY; y--) {
            for (let x = fromX; x <= toX; x++) {
                grid[y][x] = true;
            }
        }
    }
}