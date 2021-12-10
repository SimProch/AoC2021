import { d10_data, d10_test_data } from "./input.js";
// https://adventofcode.com/2021/day/10

const completingValues = {
    ")": 1,
    "]": 2,
    "}": 3,
    ">": 4
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

dayTen(d10_test_data);
dayTen(d10_data);

function dayTen(data) {
    const potentialIncomplete = getPotentialIncomplete(data);
    const resultValues = getCompletedBracketValues(potentialIncomplete);
    const median = getMedian();
    console.log(median);

    function getMedian() {
        const isOdd = resultValues.length % 2;
        if (isOdd) {
            const position = (resultValues.length - 1) / 2;
            return resultValues[position];
        } else {
            const position1 = resultValues.length / 2;
            const position2 = position1 - 1;
            return (resultValues[position1] + resultValues[position2]) / 2
        }
    }
}

function getPotentialIncomplete(data) {
    const potentialIncomplete = [];
    for (let i = 0; i < data.length; i++) {
        const string = data[i];
        const incorrectBracket = getExpectedAndAcquired(string);
        potentialIncomplete.push(incorrectBracket);
    }
    return potentialIncomplete;
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
    return lastOpenArray;
}

function isOpenBracket(char) {
    for (let j = 0; j < openArray.length; j++) {
        const openBracket = openArray[j];
        if (char === openBracket) return true;
    }
    return false;
}


function getCompletedBracketValues(potentialIncomplete) {
    const resultIncomplete = potentialIncomplete.filter(i => Array.isArray(i));
    const completingBrackets = resultIncomplete.map(incompleteBrackets => {
        let completedBrackets = incompleteBrackets.map(bracket => openToClosed[bracket]).reverse();
        return completedBrackets;
    });
    const resultValues = completingBrackets.map(brackets => {
        const value = brackets.reduce((x, y) => x * 5 + completingValues[y], 0);
        return value;
    }).sort((x, y) => x - y);
    return resultValues;
}
