"use strict"
import { getInput } from './input.js'

const testInput = getInput(true);
const realInput = getInput(false);

dayTwentyFive(testInput)
dayTwentyFive(realInput)

function dayTwentyFive(grid) {
    let gridCopy = JSON.parse(JSON.stringify(grid));
    let numberOfMoves = 1;
    let iterations = 0;
    while (numberOfMoves > 0) {
        numberOfMoves = 0;
        moveRight();
        grid = JSON.parse(JSON.stringify(gridCopy));
        moveBottom();
        grid = JSON.parse(JSON.stringify(gridCopy));
        iterations++;
        if (iterations > 10000) throw new Error("Not working")
    }
    // console.log(grid);
    console.log(iterations);

    function moveRight() {
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[0].length; j++) {
                const current = grid[i][j];
                const movesRight = current === '>';
                if (!movesRight) continue;
                let moveTo = j + 1;
                if (moveTo === grid[0].length) moveTo = 0;
                if (grid[i][moveTo] !== '.') continue;
                gridCopy[i][j] = ".";
                gridCopy[i][moveTo] = current;
                numberOfMoves++;
            }
        }
    }
    function moveBottom() {
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[0].length; j++) {
                const current = grid[i][j];
                const movesBottom = current === 'v';
                if (!movesBottom) continue;
                let moveTo = i + 1;
                if (moveTo === grid.length) moveTo = 0;
                if (grid[moveTo][j] !== '.') continue;
                gridCopy[i][j] = ".";
                gridCopy[moveTo][j] = current;
                numberOfMoves++;
            }
        }
    }
}