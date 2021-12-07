
import { d6_data } from "./input.js";

// https://adventofcode.com/2021/day/6
const TIMER_RESET_VALUE = 6;
const NEW_TIMER_VALUE = 8;
const MAX_NUMBER_OF_DAYS = 256;
daySix(d6_data)

function daySix(data) {
    const daysToBirthDictionary = {};
    new Array(NEW_TIMER_VALUE + 1).fill(0).forEach((_, i) => daysToBirthDictionary[i] = 0);
    data.forEach((x) => {
        if (!daysToBirthDictionary[x]) daysToBirthDictionary[x] = 0;
        daysToBirthDictionary[x]++;
    });

    for (let numberOfDays = 0; numberOfDays < MAX_NUMBER_OF_DAYS; numberOfDays++) {
        const daysToBirthDictionaryCopy = JSON.parse(JSON.stringify(daysToBirthDictionary));
        const daysToBirthKeys = Object.keys(daysToBirthDictionaryCopy);
        const [oneDayToBirth, ...otherDays] = daysToBirthKeys;
        const firstFishToBirth = daysToBirthDictionaryCopy[oneDayToBirth];

        otherDays.forEach(key => {
            const fishToBirth = +daysToBirthDictionary[key];
            daysToBirthDictionary[key - 1] = fishToBirth;
        })

        daysToBirthDictionary[NEW_TIMER_VALUE] = firstFishToBirth;
        daysToBirthDictionary[TIMER_RESET_VALUE] += firstFishToBirth;
    }
    const result = Object.values(daysToBirthDictionary).reduce((x,y) => x + y, 0);
    console.log(result);

}