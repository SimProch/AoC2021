
// import { d6_data } from "./input.js";

// https://adventofcode.com/2021/day/6
const data = [3, 4, 3, 1, 2]
const TIMER_RESET_VALUE = 6;
const NEW_TIMER_VALUE = 8;
const MAX_NUMBER_OF_DAYS = 256;
// daySix(d6_data)
daySix(data)

function daySix(initialStateData) {
    const data = [...initialStateData]
    const fishToValueFnDictionary = {};
    for (let numberOfDays = 0; numberOfDays < MAX_NUMBER_OF_DAYS; numberOfDays++) {
        const length = data.length;
        for (let i = 0; i < length; i++) {
            const currentDatum = data[i];
            fishToValueFnDictionary[i] = getFishValueFn(currentDatum);
            let timerValueFn = fishToValueFnDictionary[i];
            let value = timerValueFn();
            data[i] = value;
            
        }
        
        function getFishValueFn(initialValue) {
            let value = initialValue;
            return () => {
                if (value === 0) {
                    data.push(NEW_TIMER_VALUE)
                    return TIMER_RESET_VALUE
                }
                return --value
            }
        }
    }
    console.log(data.length);
}