import { d8_data, d8_test_data } from "./input.js";

// https://adventofcode.com/2021/day/8

const numberToSegmentDict = {
    0: "abcefg",
    1: "cf",
    2: "acdeg",
    3: "acdfg",
    4: "bcdf",
    5: "abdfg",
    6: "abdefg",
    7: "acf",
    8: "abcdefg",
    9: "abcdfg",
}

const segmentToNumberDict = {
    "abcefg": 0,
    "cf": 1,
    "acdeg": 2,
    "acdfg": 3,
    "bcdf": 4,
    "abdfg": 5,
    "abdefg": 6,
    "acf": 7,
    "abcdefg": 8,
    "abcdfg": 9,
}

const uniqueSegments = [1,4,7,8];

dayEight(d8_test_data);
dayEight(d8_data);

function dayEight(data) {
    const outputData = getOutputData(data)
    const joinedData = outputData.flat();
    let result = 0;
    joinedData.forEach(segment => {
        const isUnique = uniqueSegments.find(i => numberToSegmentDict[i].length === segment.length);
        if (isUnique) result++;
    })
    console.log(result);
}

function getOutputData(data) {
    const result = data.map(s => {
        const [entries, output] = s.split("|");
        return output.trim().split(" ");
    })
    return result;
}