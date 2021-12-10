import { d10_data, d10_test_data } from "./input.js";

const charValues = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137
}

const openArray = [
    "(",
    "[",
    "{",
    "<"
]

const openToClosed = {
    "(": ")",
    "[": "]",
    "{": "}",
    "<": ">"
}

// https://adventofcode.com/2021/day/10
dayTen(d10_test_data);
// dayTen(d10_data);

function dayTen(data) {
    const potentialErrors = [];
    for (let i = 0; i < data.length; i++) {
        const string = data[i];
        const incorrectBracket = getExpectedAndAcquired(string);
        potentialErrors.push(incorrectBracket)
    }
    const resultErrors = potentialErrors.filter(Boolean);
    const count = resultErrors.reduce((x,y) => x + charValues[y.got],0);
    console.log(count);
}

function getExpectedAndAcquired(inputString) {
    const lastOpenArray = [];
    for (let i = 0; i < inputString.length; i++) {
        const char = inputString[i];
        const isOpen = isOpenBracket(char);
        if (isOpen) {
            lastOpenArray.push(char);
            continue;
        }

        const lastOpen = lastOpenArray[lastOpenArray.length - 1]
        const got = char;
        const expected = openToClosed[lastOpen];
        const closesLastItem = expected === got;
        if (closesLastItem) lastOpenArray.pop();
        else return { expected, got }
    }
    return false;
}

function isOpenBracket(char) {
    for (let j = 0; j < openArray.length; j++) {
        const openBracket = openArray[j];
        if (char === openBracket) return true;
    }
    return false;
}

