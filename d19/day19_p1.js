import { getInput } from './input.js';
import { transforms, addPositions, subtractPositions } from './utils.js';


function dayNineteen(input) {
    const relative = JSON.parse(JSON.stringify(input));
    const relativeKeys = Object.keys(relative);
    const absolute = getBeaconsRelativeToZero(relative, relativeKeys);
    getAllAbsoluteBeacons();
    const beaconPositions = getUniqueBeacons();
    return beaconPositions.length;

    function getUniqueBeacons() {
        const values = Object.values(absolute);
        let duplicateResult = [];
        for (let i = 0; i < values.length; i++) {
            duplicateResult = [...duplicateResult,...values[i]]
        }
        const result = {};
        for (let i = 0; i < duplicateResult.length; i++) {
            const key = duplicateResult[i].join();
            result[key] = true;
        }

        return Object.keys(result);
    }


    function getAllAbsoluteBeacons() {
        while (relativeKeys.length > 0) {
            const foundBeacons = findRelativeBeacons();
            if (!foundBeacons) {
                console.error("Unable to find all beacons. Code has error");
                break;
            }
        }
    }

    function findRelativeBeacons() {
        for (const beaconKeys in absolute) {
            const knownBeacons = absolute[beaconKeys];
            for (let relativeKeyPosition = 0; relativeKeyPosition < relativeKeys.length; relativeKeyPosition++) {
                const currentKey = relativeKeys[relativeKeyPosition];
                const current = relative[currentKey];
                const found = transformBeaconPositions(
                    current,
                    knownBeacons,
                    relativeKeyPosition
                );
                if (found) return true;
            }
        }
        return false;

        function transformBeaconPositions(current, knownBeacons, relativeKeyPosition) {
            for (let transformation of transforms) {
                const possibleBeacons = current.map(transformation);
                const beaconHitCount = {};
                const found = comparePossibleWithKnown(
                    knownBeacons,
                    possibleBeacons,
                    beaconHitCount,
                    relativeKeyPosition
                );
                if (found) return true;
            }
            return false;


            function comparePossibleWithKnown(
                knownBeacons,
                possibleBeacons,
                beaconHitCount,
                relativeKeyPosition
            ) {
                for (let knownBeacon of knownBeacons) {
                    for (let possibleBeacon of possibleBeacons) {
                        const subtractedPositions = subtractPositions(knownBeacon, possibleBeacon);
                        const positionKey = subtractedPositions.join();
                        if (!beaconHitCount[positionKey]) beaconHitCount[positionKey] = 0;
                        beaconHitCount[positionKey]++
                        if (beaconHitCount[positionKey] === 12) {
                            const foundBeacons = possibleBeacons.map((beacon) => addPositions(subtractedPositions, beacon));
                            absolute[positionKey] = foundBeacons;
                            relativeKeys.splice(relativeKeyPosition, 1);
                            return true;
                        }
                    }
                }
                return false;
            }
        }
    }
}


function getBeaconsRelativeToZero(relative, keys) {
    const absolute = {};
    const zeroCoords = getKey([0, 0, 0])
    absolute[zeroCoords] = [];
    const zero = relative[keys[0]]
    zero.forEach(x => {
        absolute[zeroCoords].push(x);
    });
    delete relative[keys[0]];
    keys.splice(0, 1);
    return absolute;
}


const getKey = (x) => x.join()
// const input = getInput(true);
const input = getInput(false);
const d1 = dayNineteen(input);
console.log(d1);