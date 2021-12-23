"use strict"
import { getInput } from "./input.js";
import { getMinMaxAsArray } from "./utils.js";

const testInput = getInput(true);
console.log(dayTwentyTwo(testInput));
const dayInput = getInput(false);
const p1 = dayInput.filter(cuboid => getMinMaxAsArray(cuboid).some(i => Math.abs(i) <= 50))
const part1Solution = dayTwentyTwo(p1);
const part2Solution = dayTwentyTwo(dayInput);
console.log(part1Solution);
console.log(part2Solution);

function dayTwentyTwo(cuboids) {
    const finalCuboids = getTurnedOnCuboids();
    return finalCuboids.reduce((x, y) => x + y.volume(), 0)

    function getTurnedOnCuboids() {
        let lit = [];

        cuboids.forEach(inputCuboid => {
            const newLitCuboids = [];
            lit.forEach(litCuboid => {
                if (litCuboid.isOverlapping(inputCuboid)){
                    const cutCuboids = litCuboid.splitCuboid(inputCuboid);
                    newLitCuboids.push(...cutCuboids);
                } else {
                    newLitCuboids.push(litCuboid);
                }
            });
            if (inputCuboid.status) {
                newLitCuboids.push(inputCuboid);
            }
            lit = newLitCuboids;
        });

        return lit;
    }
}