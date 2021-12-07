import { d7_data } from "./input.js";

// https://adventofcode.com/2021/day/7
const data = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14]
daySeven(data)
daySeven(d7_data)

function daySeven(pathing) {
    const max = Math.max(...pathing);
    const fuelUsageDictionary = getUsageDictionary();
    fillFuelUsage();
    const fuelUsage = Object.values(fuelUsageDictionary);
    const lowestFuelUsage = Math.min(...fuelUsage);
    console.log(lowestFuelUsage)

    function getUsageDictionary() {
        const fuelUsageDictionary = {};
        for (let i = 0; i < max; i++) fuelUsageDictionary[i] = 0;
        return fuelUsageDictionary
    }

    function fillFuelUsage() {
        for (let i = 0; i < pathing.length; i++) {
            const current = pathing[i];
            for (let key in fuelUsageDictionary){
                const alignTo = +key;
                if (alignTo === current) continue;

                let result = 0;
                let smaller = current < alignTo ? current : alignTo;
                let higher = alignTo < current ? current : alignTo;
                let counter = 1;
                for (let i = smaller; i < higher; i++) {
                    result += counter
                    counter++
                }
                fuelUsageDictionary[key] += result;
            };
        }
    }
}