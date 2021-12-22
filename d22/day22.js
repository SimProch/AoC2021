import { getInput } from "./input.js";

const testInput = getInput(true);
const dict = {};
// dayTwentyTwo(testInput);
const realInput = getInput(false);
dayTwentyTwo(realInput);


function dayTwentyTwo(input) {
    
    for (let i = 0; i < input.length; i++) {
        const current = input[i];
        const inRange = isInRange(current);
        if (!inRange) continue;
        iterateOverX(current);
    }
    const values = Object.values(dict);
    const on = values.filter(i => i === 'on')
    const off = values.filter(i => i === 'off')
    console.log(on.length)
    console.log(off.length)

    
    function isInRange(current) {
        const isXOutRange = isOutOfRange(current.x);
        const isYOutRange = isOutOfRange(current.y);
        const isZOutRange = isOutOfRange(current.z);
        const inRange = !(isXOutRange || isYOutRange || isZOutRange);
        return inRange

        function isOutOfRange(current) {
            return (current.from <= -50 || current.from >= 50) && (current.to <= -50 || current.to >= 50);
        }
    }
      

    function iterateOverX(current) {
        const { from, to } = current.x;
        const lower = from < to ? from : to;
        const higher = from < to ? to : from;
        for (let i = lower; i <= higher; i++) {
            iterateOverY(current, i);
        }
    }

    function iterateOverY(current, xValue) {
        const { from, to } = current.y;
        const lower = from < to ? from : to;
        const higher = from < to ? to : from;
        for (let i = lower; i <= higher; i++) {
            iterateOverZ(current, xValue, i);
        }
        
    }

    function iterateOverZ(current, xValue, yValue) {
        const { from, to } = current.z;
        const lower = from < to ? from : to;
        const higher = from < to ? to : from;
        for (let i = lower; i <= higher; i++) {
            const vals = [xValue, yValue, i];
            const key = vals.join(",");
            dict[key] = current.status
        }
    }
}