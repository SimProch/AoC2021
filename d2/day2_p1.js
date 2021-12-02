import { d2_data } from "./input.js";

// https://adventofcode.com/2021/day/2
const data = [...d2_data];

const FORWARD_IDENTIFIER = "forward";
const DOWN_IDENTIFIER = "down";
const UP_IDENTIFIER = "up";

const STARTING_POSITION = [0, 0];

function getFinalPosition() {
    let result = [...STARTING_POSITION];
    data.forEach(item => {
        const [path, value] = item.split(" ");

        if (path === FORWARD_IDENTIFIER) {
            result[0] += Number(value);
            return;
        }
        if (path === DOWN_IDENTIFIER) {
            result[1] += Number(value);
            return;
        }
        result[1] -= Number(value);
    })
    return result;
}

const finalPosition = getFinalPosition();
console.log(finalPosition);
console.log(finalPosition[0] * finalPosition[1])
// 2039256