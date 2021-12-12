// https://adventofcode.com/2021/day/12
import { d12_data, d12_test_data, d12_test_data_v2, d12_test_data_v3 } from "./input.js";

const { lowerCaseLettersDict, upperCaseLettersDict } = getLettersDict();
const lowerCaseLetters = Object.keys(lowerCaseLettersDict);

function getLettersDict() {
    const lowerCaseRange = {
        from: 97,
        to: 122
    }

    const upperCaseRange = {
        from: 65,
        to: 90
    }

    const lowerCaseLettersDict = {};
    const upperCaseLettersDict = {};

    Array.from(
        { length: (lowerCaseRange.to + 1) - lowerCaseRange.from },
        (_, index) => {
            const lowerCaseChar = getCharFromAscii(index + lowerCaseRange.from);
            const upperCaseChar = getCharFromAscii(index + upperCaseRange.from);
            lowerCaseLettersDict[lowerCaseChar] = index + lowerCaseRange.from;
            upperCaseLettersDict[upperCaseChar] = index + upperCaseRange.from
        }
    )
    return { lowerCaseLettersDict, upperCaseLettersDict };
}

function getCharFromAscii(charCode) {
    return String.fromCodePoint(charCode);
}

// const assert = (a,b) => {
//     if (a !== b) console.error("Incorrect");
//     else console.log("passed");
// };

const firstTestData = dayTwelve(d12_test_data);
const secondTestData = dayTwelve(d12_test_data_v2);
const thirdTestData = dayTwelve(d12_test_data_v3);
const result = dayTwelve(d12_data);
assert(firstTestData.size, 36)
assert(secondTestData.size, 103)
assert(thirdTestData.size, 3509)
assert(result.size, 153592)

console.log(result.size);

function dayTwelve(data) {
    const tree = getDataTreeStructure();
    updateDeepReferences(tree, tree["start"]);
    const pathMap = traverseTree(tree);
    return pathMap;

    function getDataTreeStructure() {
        const tree = {};
        for (let i = 0; i < data.length; i++) {
            let [from, to] = data[i].split("-");
            if (to === "start" || from === "end") {
                let to1 = from;
                from = to;
                to = to1;
            }
            if (!tree[from]) tree[from] = {};
            if (to !== "end" && !tree[to]) tree[to] = {};
            if (!tree[from][to]) tree[from][to] = {};
            if (from !== "start" && to !== "end" && !tree[to][from]) tree[to][from] = {};
        }
        return tree;
    }

    function updateDeepReferences(tree, current) {
        for (let key in current) {
            if (tree[key] === current[key] || key === 'end') continue;
            current[key] = tree[key];
            updateDeepReferences(tree, current[key]);
        };
    }
}

function traverseTree(tree) {
    const pathMap = new Map();
    let path = 'start';
    const start = tree["start"];
    findDeepPaths(start, path, pathMap);
    return pathMap;

    function findDeepPaths(current, currentPath, pathMap) {
        for (let key in current) {
            if (pathHasMultipleLowercase(currentPath)) return;
            let path = currentPath + `,${key}`;
            if (key === 'end') pathMap.set(path, path);
            findDeepPaths(current[key], path, pathMap);
        }
    }
}

function pathHasMultipleLowercase(path) {
    const paths = path.split(",");
    const lowerCaseCount = {};
    for (let i = 0; i < paths.length; i++) {
        if (path == "start") continue;
        const current = paths[i];
        if (!lowerCaseCount[current]) lowerCaseCount[current] = 0;
        const isLowercase = current.split("").every(curr => lowerCaseLetters.includes(curr));
        if (isLowercase) {
            lowerCaseCount[current]++
            if (lowerCaseCount[current] > 2) return true;
        }
        const values = Object.values(lowerCaseCount);
        if (values.filter(i => i > 1).length > 1) return true;
    }
    return false;
}