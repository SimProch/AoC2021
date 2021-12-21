import { getInput } from "./input.js";

const BOARD_START = 1;
const BOARD_END = 10;
const DICE_START = 1;
const DICE_END = 100;

const testInput = getInput(true);
const realInput = getInput(false);

console.log(dayTwentyOne(testInput));
console.log(dayTwentyOne(realInput));


function dayTwentyOne(input) {
    let p1Position = +input[0]
    let p2Position = +input[1]
    let p1Points = 0;
    let p2Points = 0;
    let diceValue = 0;
    let diceRolls = 0;
    let isPlayerOneTurn = true;

    while (p1Points < 1000 && p2Points < 1000) {
        diceRolls += 3;
        diceValue += 3;
        if (diceValue <= 100) updatePositionForRegular();
        else updatePositionWhenTransforming();
        isPlayerOneTurn = !isPlayerOneTurn;
    }

    return getResult(p1Points, p2Points,diceRolls);

    function updatePositionForRegular() {
        if (isPlayerOneTurn) {
            p1Position += 3 * diceValue - 3;
            if (p1Position % BOARD_END === 0) p1Position = 10;
            else p1Position = p1Position % 10;
            p1Points += p1Position;
        }
        else {
            p2Position += 3 * diceValue - 3;
            if (p2Position % BOARD_END === 0) p2Position = 10;
            else p2Position = p2Position % 10;
            p2Points += p2Position;
        }
    }

    function updatePositionWhenTransforming() {
        switch (diceValue) {
            case 101:
                if (isPlayerOneTurn) p1Position += diceValue - 2 + diceValue - 1 + 1 
                else p2Position += diceValue - 2 + diceValue - 1 + 1 
                diceValue = 1;
                break;
            case 102:
                if (isPlayerOneTurn) p1Position += diceValue - 2 + 1 + 2
                else p2Position += diceValue - 2 + 1 + 2 
                diceValue = 2;
                break;
            case 103:
                if (isPlayerOneTurn) p1Position +=  1 + 2 + 3 
                else p2Position += 1 + 2 + 3;
                diceValue = 3;
                break;
            default:
                throw new Error("Some error happened");
        }
        restartPosition();

        function restartPosition() {
            if (isPlayerOneTurn) {
                if (p1Position % BOARD_END === 0) p1Position = 10;
                else p1Position = p1Position % 10;
                p1Points += p1Position;
            }
            else {
                if (p2Position % BOARD_END === 0) p2Position = 10;
                else p2Position = p2Position % 10;
                p2Points += p2Position;
            }
        }
    }
}

function getResult(p1Points, p2Points, diceRolls) {
    if (p1Points > p2Points) return p2Points * diceRolls;
    return p1Points * diceRolls;
}