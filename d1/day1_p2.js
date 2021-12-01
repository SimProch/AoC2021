import { d1_data } from "./input.js";

// https://adventofcode.com/2021/day/1
const data = [...d1_data];

function getNumberOfLargerMeasurements() {
    let result = 0;
    let lastSum = 0;
    data.forEach((_, i, arr) => {
        if (i == data.length - 2) return;
        const sum = get_three_measurements_sum(arr, i);
        if (i == 0) {
            lastSum = sum;
            return;
        }
        if (sum > lastSum) result++
        lastSum = sum;
    })
    console.log(result);
}

function get_three_measurements_sum(arr, i) {
    const firstSum = arr[i] + arr[i + 1] + arr[i + 2];
    return firstSum
}

getNumberOfLargerMeasurements();
// 1538
