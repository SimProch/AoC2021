"use strict"
import { getInput } from './input.js'

const INPUT = "inp"
const ADDITION = "add";
const MULTIPLICATION = "mul";
const DIVISION = "div";
const MODULO = "mod";
const EQUALS = "eql";
const CHANGING_LINES = [4, 5, 15];
const INPUT_LENGTH = 18;

const realInput = getInput()
dayTwentyFour(realInput);

function dayTwentyFour(programLines) {
    const availableInputs = getAvailableInputs(programLines);
    console.log(availableInputs);
    return;
    const validNumbers = [];
    for (let i = 0; i < availableInputs.length; i++) {
        const inputs = availableInputs[i];
        const inputIterator = inputs.values();
        const result = evaluateProgram(programLines, inputIterator);
        const isValid = result.z === 0;
        if (isValid) validNumbers.push(+inputs.join(""));
    }
    validNumbers.reduce((x, y) => x < y ? x : y, 0)
    console.log(validNumbers);
}

function getAvailableInputs(programLines) {
    const changingLinesConstants = getChangingLines();
    const attempts = makeConstrainedValues(changingLinesConstants);
    return attempts

    function getChangingLines() {
        const changingLines = [];
        for (let j = 0; j < 14; j++) {
            const args = [];
            for (const i of CHANGING_LINES) {
                const k = i + j * INPUT_LENGTH;
                args.push(parseInt(programLines[k].value));
            }
            changingLines.push(args);
        }
        return changingLines
    }

    function makeConstrainedValues(changingLines) {
        const deps = [0];
        const constraints = new Array(14).fill(null);
        for (let i = 0; i < changingLines.length; i++) {
            let p = changingLines[i];
            if (p[0] == 1) {
                deps.push(i);
            } else {
                constraints[i] = deps.pop();
            }
        }

        const maxValues = new Array(14).fill(null);
        const minValues = new Array(14).fill(null);
        for (const [i, constraint] of constraints.entries()) {
            if (constraint === null) continue;
            maxValues[constraint] = Math.min(
                9,
                9 - changingLines[constraint][2] - changingLines[i][1],
            );

            const sum = changingLines[constraint][2] + changingLines[i][1];
            minValues[constraint] = Math.max(1 - sum, 1);
        }

        const maxAttempt = [];
        const minAttempt = [];
        for (let i = 1; i < maxValues.length; i++) {
            maxAttempt.push(maxValues[i]);
            minAttempt.push(minValues[i]);
        }
        for (const [i, constraint] of constraints.entries()) {
            if (constraint == null) continue;
            maxAttempt[i] = maxAttempt[constraint] +
                changingLines[constraint][2] + changingLines[i][1];
            minAttempt[i] = minAttempt[constraint] +
                changingLines[constraint][2] + changingLines[i][1];
        }

        return [maxAttempt, minAttempt];
    }
}

function evaluateProgram(program, inputIterator) {
    const variables = {};
    for (let i = 0; i < program.length; i++) {
        const line = program[i];
        performOperation(line);
    }
    return variables;

    function getParsedNumber(numberOrKey) {
        const decimalNumber = parseInt(numberOrKey, 10);
        const isVariableOrUndefined = Number.isNaN(decimalNumber);
        return isVariableOrUndefined
            ? (variables[numberOrKey] || 0)
            : decimalNumber;
    }


    function performOperation(line) {
        const { operation, variable, value } = line;
        switch (operation) {
            case INPUT:
                variables[variable] = inputIterator.next().value;
                break;
            case ADDITION:
                variables[variable] = getParsedNumber(variable) + getParsedNumber(value);
                break;
            case MULTIPLICATION:
                variables[variable] = getParsedNumber(variable) * getParsedNumber(value);
                break;
            case DIVISION:
                variables[variable] = Math.floor(getParsedNumber(variable) / getParsedNumber(value));
                break;
            case MODULO:
                variables[variable] = getParsedNumber(variable) % getParsedNumber(value);
                break;
            case EQUALS:
                variables[variable] = getParsedNumber(variable) === getParsedNumber(value) ? 1 : 0;
                break;
            default:
                throw new Error("Unknown op: " + operation)
        }
    }
}
