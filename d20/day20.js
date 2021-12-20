import { getInput } from "./input.js";
import "./replaceAll.js";

const NUMBER_OF_ITERATIONS = 50;
const testInput = getInput(true);
const realInput = getInput(false);

dayTwenty(testInput);
dayTwenty(realInput);

function dayTwenty(input) {
    let { imageEnhancementAlgorithm, image } = input;

    for (let i = 0; i < NUMBER_OF_ITERATIONS; i++) {
        const hasHashOnStart = imageEnhancementAlgorithm[0] === "#";
        const extendWith = hasHashOnStart ? i % 2 ? "#" : "." : "."
        extendImage(extendWith);
        const points = getPointsToChange(image, imageEnhancementAlgorithm, extendWith);
        replaceImagePoints(points);
    }

    const result = getNumberOfPixelsLit();
    console.log(result);
    return result;

    function extendImage(extendWith) {
        extendColumnsWith(extendWith);
        extendRowsWith(extendWith);

        function extendColumnsWith(what) {
            for (let i = 0; i < image.length; i++) {
                image[i].unshift(what);
                image[i].push(what);
            }
        }

        function extendRowsWith(what) {
            const rowLength = image[0].length;
            const getNewArr = () => new Array(rowLength).fill(what);
            image.unshift(getNewArr());
            image.push(getNewArr());
        }
    }

    function replaceImagePoints(points) {
        for (let k = 0; k < points.length; k++) {
            const { i, j, newValue } = points[k];
            image[i][j] = newValue;
        }
    }

    function getNumberOfPixelsLit() {
        let result = 0;
        for (let i = 0; i < image.length; i++) {
            for (let j = 0; j < image[0].length; j++) {
                if (image[i][j] == "#") result++;
            }
        }
        return result;
    }
}

function getPointsToChange(imageMatrix, algorithm, extendWith) {
    const result = [];
    for (let i = 0; i < imageMatrix.length; i++) {
        for (let j = 0; j < imageMatrix[i].length; j++) {
            const threeByThree = getThreeByThreeArray(imageMatrix, i, j, extendWith)
            const indexBinary = getBinaryFromThreeByThree(threeByThree);
            const index = getIndexInAlgorithm(indexBinary);
            const newValue = algorithm[index];
            result.push({
                i,
                j,
                newValue
            })
        }
    }
    return result;
}

function getThreeByThreeArray(matrix, i, j, extendWith) {
    const aboveRow = getAboveRow();
    const middleRow = getMiddleRow();
    const belowRow = getBelowRow();
    return [aboveRow, middleRow, belowRow];


    function getAboveRow() {
        const current = matrix[i - 1]?.[j] ?? extendWith;
        const left = matrix[i - 1]?.[j - 1] ?? extendWith;
        const right = matrix[i - 1]?.[j + 1] ?? extendWith;
        return [left, current, right];
    }

    function getMiddleRow() {
        const current = matrix[i]?.[j] ?? extendWith;
        const left = matrix[i]?.[j - 1] ?? extendWith;
        const right = matrix[i]?.[j + 1] ?? extendWith;
        return [left, current, right];
    }

    function getBelowRow() {
        const current = matrix[i + 1]?.[j] ?? extendWith;
        const left = matrix[i + 1]?.[j - 1] ?? extendWith;
        const right = matrix[i + 1]?.[j + 1] ?? extendWith;
        return [left, current, right];
    }
}

function getBinaryFromThreeByThree(matrix) {
    return matrix.flat().join("").replaceAll(".", "0").replaceAll("#", "1");
}

function getIndexInAlgorithm(binary) {
    return parseInt(binary, 2);
}