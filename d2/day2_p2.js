import { d2_data } from "./input.js";

// https://adventofcode.com/2021/day/2
const data = [...d2_data];

const FORWARD_IDENTIFIER = "forward";
const DOWN_IDENTIFIER = "down";
const UP_IDENTIFIER = "up";

const STARTING_POSITION = [0, 0];

function getFinalPosition() {
    let result = [...STARTING_POSITION];
    let aim = 0;
    data.forEach(item => {
        const [path, value] = item.split(" ");

        if (path === FORWARD_IDENTIFIER) {
            result[0] += Number(value);
            result[1] += aim * Number(value);
            return;
        }
        if (path === DOWN_IDENTIFIER) {
            aim += Number(value);
            return;
        }
        aim -= Number(value);
    })
    return result;
}

const finalPosition = getFinalPosition();
console.log(finalPosition);
console.log(finalPosition[0] * finalPosition[1])
// 1856459736