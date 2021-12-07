import { d7_data } from "./input.js";

// https://adventofcode.com/2021/day/7
const data = [16,1,2,0,4,2,7,1,2,14]
daySeven(data)
daySeven(d7_data)

function daySeven(pathing) {
    const max = Math.max(...pathing);
    const fuelDictionary = {};
    for (let i = 0; i < max; i++) fuelDictionary[i] = 0;
    const fuelDictionaryKeys = Object.keys(fuelDictionary);
    for (let i = 0; i < pathing.length; i++) {
        const current = pathing[i];
        fuelDictionaryKeys.forEach(i => fuelDictionary[i] += Math.abs(current - (+i)));
    }
    const fuelUsage = Object.values(fuelDictionary);
    const lowestFuelUsage = Math.min(...fuelUsage);
    console.log(lowestFuelUsage)
}