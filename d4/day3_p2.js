import { boards, input } from "./input.js";

// https://adventofcode.com/2021/day/4

findCheckedBoard(input, boards);
// 15561

function findCheckedBoard(input, boardDictionary) {
    const emptyBoardDictionary = {};
    const filledBoards = {};
    Object.keys(boardDictionary).forEach(i => {
        emptyBoardDictionary[i] = getEmptyBoard()
        filledBoards[i] = false;
    })
    let filledBoardKey;
    let lastNumber;
    for (let i = 0; i < input.length; i++) {
        const value = input[i];
        for (const [key, boards] of Object.entries(boardDictionary)) {
            if (filledBoards[key]) continue;
            const indexes = findFilledNumberIndexes(boards, value);
            if (!indexes) continue;
            const columnIndex = indexes[0];
            const rowIndex = indexes[1];
            emptyBoardDictionary[key][columnIndex][rowIndex] = true;
            if (isBoardFilled(emptyBoardDictionary[key])) {
                filledBoardKey = key;
                lastNumber = value;
                filledBoards[filledBoardKey] = true;
                continue;
            }
        }
    }
    const result = getBoardResult(
        emptyBoardDictionary[filledBoardKey],
        boardDictionary[filledBoardKey],
        lastNumber
    );
    console.log(result);
}

function getBoardResult(emptyBoard, numberBoard, lastNumber) {
    let uncalledSum = 0;
    for (let i = 0; i < emptyBoard.length; i++) {
        for (let j = 0; j < emptyBoard[i].length; j++) {
            const emptyCell = emptyBoard[i][j];
            const numberCell = numberBoard[i][j];
            if (!emptyCell) uncalledSum += numberCell;
        }
    }
    return uncalledSum * lastNumber;
}

function findFilledNumberIndexes(board, number) {
    for (let i = 0; i < board.length; i++) {
        const row = board[i]
        for (let j = 0; j < row.length; j++) {
            const cell = row[j];
            if (cell == number) return [i, j];
        }
    }
    return null;
}

function isBoardFilled(board) {
    for (let i = 0; i < board.length; i++) {
        let isRowFilled = true;
        let isColumnFilled = true;
        for (let j = 0; j < board[i].length; j++) {
            const rowCell = board[i][j];
            const columnCell = board[j][i];
            if (!rowCell) isRowFilled = false;
            if (!columnCell) isColumnFilled = false;
            if (!isRowFilled && !isColumnFilled) break;
        }
        if (isRowFilled || isColumnFilled) return true;
    }
    return false;
}

function getEmptyBoard() {
    return [
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
    ];
}