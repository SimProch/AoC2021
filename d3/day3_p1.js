import { d3_data } from "./input.js";

// https://adventofcode.com/2021/day/3
const data = [...d3_data];

const bitTruePositionCountDictionary = {};

function getGammaRate() {
    let result = {
        gamma: "",
        epsilon: ""
    };
    getTrueBits();
    getGammaAndEpsilonValues();
    const gamma = parseInt(result.gamma, 2);
    const epsilon = parseInt(result.epsilon, 2);
    return gamma * epsilon;

    function getTrueBits() {
        data[0].split("").forEach((x, i) => bitTruePositionCountDictionary[i] = 0);
        data.forEach(item => {
            for (let i = 0; i < item.length; i++) {
                const bit = Number(item[i]);
                if (bit)
                    bitTruePositionCountDictionary[i]++;
            }
        });
    }

    function getGammaAndEpsilonValues() {
        for (const key in bitTruePositionCountDictionary) {
            const ones = bitTruePositionCountDictionary[key];
            const zeroes = data.length - bitTruePositionCountDictionary[key];
            if (ones > zeroes) {
                result.gamma += "1";
                result.epsilon += "0";
            }
            else {
                result.epsilon += "1";
                result.gamma += "0";
            }
        }
    }
}
console.log(getGammaRate());
// 3882564