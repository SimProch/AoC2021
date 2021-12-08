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
const uniqueSegments = [1, 4, 7, 8];
const segmentsLengthDict = {};
uniqueSegments.forEach(x => segmentsLengthDict[x] = numberToSegmentDict[x].length);
let shouldLog = true;

// issue at key 3, 4

dayEight(d8_test_data);

function dayEight(data) {
    const outputData = getIndexToWireDictionary(data)
    const dataKeys = Object.keys(outputData);
    findKeysToDecode();
    getResult();

    function getResult() {
        dataKeys.forEach(key => {
            const output = outputData[key].output;
            const legend = outputData[key].key;
            let resultNumbers = [];
            output.forEach(item => {
                let sortedOutput = item.split("").sort().join("");
                const value = legend[sortedOutput];
                resultNumbers.push(value);
            })
            console.log(output);
            console.log(resultNumbers);
        });
    }

    function findKeysToDecode() {
        dataKeys.forEach(key => {
            const decodedToCoded = findAllSegmentCodes(outputData, key);
            const codedDict = {};
            Object.keys(numberToSegmentDict).forEach(segment => {
                const decoded = numberToSegmentDict[segment];
                let coded = "";
                decoded.split("").forEach(char => {
                    coded += decodedToCoded[char];
                });
                let codedSorted = coded.split("").sort().join("");
                codedDict[codedSorted] = segment;
            });
            outputData[key].key = codedDict;
        });
    }
}

function getIndexToWireDictionary(data) {
    const result = {};
    data.forEach((s, i) => {
        const [entries, output] = s.split("|");
        result[i] = {
            entries: entries.trim().split(" "),
            output: output.trim().split(" ")
        }
    })
    return result;
}

function findAllSegmentCodes(outputData, key) {
    const decodedToCoded = {};

    const { entries, output } = outputData[key];
    const joinedData = [...entries, ...output];
    const uniqueSegmentParts = uniqueSegments.map(i => findSegmentParts(i));
    const [one, four, seven] = uniqueSegmentParts;

    decodeForOne();
    decodeForFour(four);
    decodeForSeven(seven);
    const [six, nine] = findNineAndSix();
    confirmOneSegments(nine);
    confirmFourSegments(four);
    return decodedToCoded;

    function confirmFourSegments(four) {
        // we know all segments except middle and top left
        // we must decode last 2 segments exactly
        // This is shared between 5 and 2. So we remove from 4 digits that are not in either
        const five = numberToSegmentDict[5];
        const two = numberToSegmentDict[2];
        let codedTwo = "";
        let codedFive = "";
        // encode 5
        for (let i = 0; i < five.length; i++) {
            const char = five[i];
            codedFive += decodedToCoded[char];
        }
        // encode 2
        for (let i = 0; i < two.length; i++) {
            const char = two[i];
            codedTwo += decodedToCoded[char];
        }

        const middle = four.split("").find(i => codedTwo.includes(i) && codedFive.includes(i))
        if (decodedToCoded["d"] !== middle) {
            const d = decodedToCoded["b"];
            const b = decodedToCoded["d"];
            decodedToCoded["b"] = b;
            decodedToCoded["d"] = d;

        }
    }

    function decodeForOne() {
        decodedToCoded["c"] = one[0];
        decodedToCoded["f"] = one[1];
    }

    function decodeForSeven(seven) {
        // We know for sure which is top segment
        one.split("").forEach(i => (seven = seven.replace(i, "")));
        decodedToCoded["a"] = seven;
    }

    function decodeForFour(four) {
        one.split("").forEach(i => four = four.replace(i, ""));
        decodedToCoded["d"] = four[0];
        decodedToCoded["b"] = four[1];
    }

    function findNineAndSix() {
        let foundLetters = Object.values(decodedToCoded);
        const possibleNinesAndSixes = joinedData.filter(i => numberToSegmentDict[9].length === i.length);
        const nine = findNine();
        foundLetters = Object.values(decodedToCoded);
        const six = findSix();
        return [six, nine];

        function findNine() {
            // we know for sure which si bottom segment
            for (let i = 0; i < possibleNinesAndSixes.length; i++) {
                let possibleNine = possibleNinesAndSixes[i];
                let confirmedNine = possibleNine;
                foundLetters.forEach(i => possibleNine = possibleNine.replace(i, ""));
                if (possibleNine.length === 1) {
                    decodedToCoded["g"] = possibleNine;
                    return confirmedNine;
                }
            }
        }

        function findSix() {
            // after decoding for 9, we know for sure which is bottom left segment
            for (let i = 0; i < possibleNinesAndSixes.length; i++) {
                let possibleSix = possibleNinesAndSixes[i];
                let confirmedSix = possibleSix;
                foundLetters.forEach(i => possibleSix = possibleSix.replace(i, ""));
                if (possibleSix.length === 1) {
                    decodedToCoded["e"] = possibleSix;
                    return confirmedSix;
                }
            }
        }
    }

    function confirmOneSegments(nine) {
        // in decode for one, we don't know segment is which exactly, so we confirm by comparing 6 and 9
        six.split("").forEach(i => (nine = nine.replace(i, "")));
        if (decodedToCoded["c"] !== nine) {
            const c = decodedToCoded['f'];
            const f = decodedToCoded['c'];
            decodedToCoded['c'] = c;
            decodedToCoded['f'] = f;
        }
    }

    function findSegmentParts(number) {
        const parts = joinedData.find(i => i.length === segmentsLengthDict[number]);
        let sortedParts = parts.split("").sort().join("");
        return sortedParts;
    }
}

