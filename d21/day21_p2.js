import { getInput } from "./input.js";
import { movingFrom } from './utils.js';

const possibleMoves = movingFrom();
const testInput = getInput(true);
const realInput = getInput(false);
const cache = {};

// console.log(dayTwentyOne(testInput));
console.time();
console.log(dayTwentyOne(realInput));
console.timeEnd();


function dayTwentyOne(input) {
    let p1Position = +input[0]
    let p2Position = +input[1]

    const rollWins = [0,0];
    performRoll(p1Position, 0, p2Position, 0, true, rollWins);

    return getResult(rollWins[0], rollWins[1]);

    function performRoll(p1Position, p1Points, p2Position, p2Points, isPlayerOneTurn, rollWins) {
        const cacheKey = `${p1Position}__${p1Points}__${p2Position}__${p2Points}__${isPlayerOneTurn}`;
        let p1Wins = 0;
        let p2Wins = 0;
        if (cache[cacheKey]) {
            rollWins[0] += cache[cacheKey].p1Wins
            rollWins[1] += cache[cacheKey].p2Wins
            return [cache[cacheKey].p1Wins, cache[cacheKey].p2Wins];
        }
        if (isPlayerOneTurn) {
            const p1p = p1Points;
            const p1Options = possibleMoves[p1Position];
            for (let key in p1Options) {
                let nextPosition = p1Options[key].landsOn;
                p1Points = p1p + nextPosition;
                if (p1Points < 21) {
                    const [p1, p2] = performRoll(nextPosition, p1Points, p2Position, p2Points, !isPlayerOneTurn, rollWins);
                    p1Wins += p1;
                    p2Wins += p2;
                } else {
                    rollWins[0]++;
                    p1Wins++;
                }
            }
        }
        else {
            const p2p = p2Points;
            const p2Options = possibleMoves[p2Position];
            for (let key in p2Options) {
                let nextPosition = p2Options[key].landsOn;
                p2Points = p2p + nextPosition;
                if (p2Points < 21) {
                    const [p1, p2] = performRoll(p1Position, p1Points, nextPosition, p2Points, !isPlayerOneTurn, rollWins);
                    p1Wins += p1;
                    p2Wins += p2;
                } else {
                    rollWins[1]++;
                    p2Wins++;
                }
            }
        }
        cache[cacheKey] = {
            p1Wins,
            p2Wins
        }
        return [p1Wins, p2Wins];
    }
}

function getResult(p1Wins, p2Wins) {
    return p1Wins > p2Wins ? p1Wins : p2Wins
} 