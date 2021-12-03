"use strict";
import { d3_data } from "./input.js";

// https://adventofcode.com/2021/day/3
const data = [...d3_data];

function getOxygen() {
    let resultOxygen = [...data];
    let resultCo2 = [...data];
    for (let i = 0; i < data[0].length; i++) {
        const oxygenOnes = getTrueBits(resultOxygen, i);
        const oxygenZeroes = resultOxygen.length - oxygenOnes;
        const Co2Ones = getTrueBits(resultCo2, i);
        const Co2Zeroes = resultCo2.length - Co2Ones;

        if (oxygenOnes >= oxygenZeroes) {
            if (resultOxygen.length !== 1) resultOxygen = resultOxygen.filter((item) => item[i] == "1")
        }
        else {
            if (resultOxygen.length !== 1) resultOxygen = resultOxygen.filter((item) => item[i] == "0");
        }

        if (Co2Ones >= Co2Zeroes) {
            if (resultCo2.length !== 1) resultCo2 = resultCo2.filter((item) => item[i] == "0");
        }
        else {
            if (resultCo2.length !== 1) resultCo2 = resultCo2.filter((item) => item[i] == "1")
        }
        if (resultOxygen.length === 1 && resultCo2.length === 1) break;
    }
    const oxygen = parseInt(resultOxygen[0], 2);
    const co2 = parseInt(resultCo2, 2);
    return co2 * oxygen;
}

function getTrueBits(data, index) {
    let result = 0;
    data.forEach((item) => {
        item = item.slice(index);
        const bit = Number(item[0]);
        if (bit) result++;
    });
    return result;
}
console.log(getOxygen());
// 3882564