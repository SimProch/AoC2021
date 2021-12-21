export function movingFrom() {
    const result = {};
    const possibleSteps = getPossibleSteps();
    for (let goesFrom = 1; goesFrom <= 10; goesFrom++) {
        result[goesFrom] ??= {};
        Object.keys(possibleSteps).forEach(stepKey => {
            const goesTo = goesFrom + possibleSteps[stepKey].startsFrom;
            const landsOn = goesTo === 10 ? 10 : goesTo % 10;
            result[goesFrom][stepKey] ??= {};
            result[goesFrom][stepKey].landsOn = landsOn;
        })
    }
    return result;
}

function getPossibleSteps() {
    const result = {};
    for (let i = 1; i <= 3; i++) {
        for (let j = 1; j <= 3; j++) {
            for (let k = 1; k <= 3; k++) {
                const key = [i, j, k].join("");
                result[key] ??= {};
                result[key].startsFrom = i + j + k;
            }
        }
    }
    return result;
}