import { d14_data, d14_dictionary, d14_test_data, d14_test_dictionary } from "./input.js";

// https://adventofcode.com/2021/day/14

const NUMBER_OF_STEPS = 10;
// dayFourteen(d14_test_data, d14_test_dictionary);
dayFourteen(d14_data, d14_dictionary);

function dayFourteen(data, dictionary) {
    let string = data[0];
    for (let i = 0; i < NUMBER_OF_STEPS; i++) {
        string = updateString();
    }
    const { charCounter, minKey, maxKey } = getCharsCounted(string);
    const min = charCounter[minKey];
    const max = charCounter[maxKey];
    console.log(max - min);

    function updateString() {
        let updatedString = "";
        for (let i = 0; i < string.length; i++) {
            let chars = string.slice(i, i + 2);
            if (chars.length == 1) {
                updatedString += chars;
                break;
            }
            let toInsert = dictionary[chars];
            updatedString += chars[0] + toInsert
        }
        return updatedString;
    }

    function getCharsCounted(string) {
        const charCounter = {};
        for (let i = 0; i < string.length; i++) {
            const char = string[i];
            if (!charCounter[char]) charCounter[char] = 0
            charCounter[char]++;
        }
        let minKey;
        let maxKey;
        for (let key in charCounter) {
            if (!minKey) minKey = key;
            if (!maxKey) maxKey = key;
            if (charCounter[key] > charCounter[maxKey]) maxKey = key;
            if (charCounter[key] < charCounter[minKey]) minKey = key;
        }
        return { charCounter, minKey, maxKey }

    }
}
