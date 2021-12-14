import { d14_data, d14_dictionary, d14_test_data, d14_test_dictionary } from "./input.js";

// https://adventofcode.com/2021/day/14

const NUMBER_OF_STEPS = 40;
// dayFourteen(d14_test_data, d14_test_dictionary);
dayFourteen(d14_data, d14_dictionary);

function dayFourteen(data, dictionary) {
    let string = data[0];
    let currentPairs = {};
    const nextPairs = {};
    Object.keys(dictionary).forEach(i => currentPairs[i] = 0);
    Object.keys(dictionary).forEach(i => nextPairs[i] = 0);
    const charCount = {};
    Object.keys(nextPairs).forEach(key => {
        const chars = key.split("")
        chars.forEach(char => charCount[char] = 0);
    });
    string.split("").forEach(i => charCount[i]++);
    initializePairs();
    for (let i = 0; i < NUMBER_OF_STEPS; i++) {
        traversePairs();
        currentPairs = { ...nextPairs };
    }
    const { minKey, maxKey } = getMinMaxKeys();
    console.log(minKey)
    console.log(maxKey)
    console.log(charCount[maxKey])
    console.log(charCount[minKey])
    console.log(charCount[maxKey] - charCount[minKey]);

    function initializePairs() {
        for (let i = 0; i < string.length; i++) {
            let chars = string.slice(i, i + 2);
            if (chars.length === 1) break;
            currentPairs[chars]++;
            nextPairs[chars]++;
        }
    }

    function traversePairs() {
        for (let currentPair in currentPairs) {
            const currentPairCount = currentPairs[currentPair];
            if (currentPairCount === 0) continue;
            const toAdd = dictionary[currentPair];
            const firstPairToAdd = currentPair[0] + toAdd;
            const secondPairToAdd = toAdd + currentPair[1];
            nextPairs[currentPair] -= currentPairCount;
            nextPairs[firstPairToAdd] += currentPairCount;
            nextPairs[secondPairToAdd] += currentPairCount;
            charCount[toAdd] += currentPairCount;
        }
    }

    function getMinMaxKeys() {
        let minKey;
        let maxKey;
        for (let key in charCount) {
            if (!minKey) minKey = key;
            if (!maxKey) maxKey = key;
            if (charCount[key] > charCount[maxKey]) maxKey = key;
            if (charCount[key] < charCount[minKey]) minKey = key;
        }
        return { minKey, maxKey }
    }
}
