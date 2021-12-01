import { d1_data } from "./input.js";

// https://adventofcode.com/2021/day/1
const data = [...d1_data];

function getNumberOfLargerMeasurements() {
    let result = 0;
    data.forEach((item, index) => {
        if (index == 0) return;
        if (item > data[index - 1]) result++;
    })
    console.log(result);
}

getNumberOfLargerMeasurements();
// 1502