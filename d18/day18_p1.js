import { d18_data, d18_data_test, single_line } from "./input.js";

// https://adventofcode.com/2021/day/18

dayEighteen(single_line)
// dayEighteen(d18_data)

function dayEighteen(inputData) {
    const data = JSON.parse(JSON.stringify(inputData));
    while (data.length > 1) {
        performAddition(data);
        const current = data[0];
        const tree = getTreeStructure(current);
        updateTree(tree, 1);
        console.log(tree);


        function updateTree(currentNode, nestLevel) {
            if (!currentNode) return;
            const { first, second, $parent } = currentNode;
            if (nestLevel <= 4) {
                updateDeeperLevels(currentNode);
            } else {
                explode();
            }
            const splitFirst = first?.value && first.value >= 10
            const splitSecond = second?.value && second.value >= 10

            if (splitFirst || splitSecond) split();

            function split() {
                if (splitFirst) {
                    const splitValueOne = Math.floor(first.value / 2);
                    const splitValueTwo = Math.ceil(first.value / 2);
                    const nodeToAdd = {};
                    nodeToAdd.first = {
                        value: splitValueOne,
                        $parent: nodeToAdd
                    }
                    nodeToAdd.second = {
                        value: splitValueTwo,
                        $parent: nodeToAdd
                    }
                    nodeToAdd.$parent = currentNode
                    currentNode.first = nodeToAdd
                }
                if (splitSecond) {
                    const splitValueOne = Math.floor(second.value / 2);
                    const splitValueTwo = Math.ceil(second.value / 2);
                    const nodeToAdd = {};
                    nodeToAdd.first = {
                        value: splitValueOne,
                        $parent: nodeToAdd
                    }
                    nodeToAdd.second = {
                        value: splitValueTwo,
                        $parent: nodeToAdd
                    }
                    nodeToAdd.$parent = currentNode
                    currentNode.second = nodeToAdd
                }
                updateDeeperLevels(currentNode);
            }

            function updateDeeperLevels(currentNode) {
                updateTree(currentNode.first, nestLevel + 1);
                updateTree(currentNode.second, nestLevel + 1);
            }

            function explode() {
                if (!first && !second) return;
                if ($parent.second === currentNode) explodeSecondNode();
                else explodeFirstNode();

                function explodeFirstNode() {
                    $parent.second = {
                        value: $parent.second.value + second.value,
                        $parent
                    };
                    const closestLeft = getClosestLeftTree();
                    if (closestLeft) closestLeft.value += first.value
                    $parent.first = {
                        value: 0,
                        $parent,
                    }
                }

                function explodeSecondNode() {
                    $parent.first = {
                        value: $parent.first.value + first.value,
                        $parent
                    };
                    const closestRight = getClosestRightTree();
                    if (closestRight) closestRight.value += second.value
                    $parent.second = {
                        value: 0,
                        $parent
                    };
                }

                function getClosestLeftTree() {
                    if ($parent.$parent.first != $parent) return $parent.$parent.first
                    if ($parent.$parent.$parent.first != $parent.$parent) return $parent.$parent.$parent.second
                    if ($parent.$parent.$parent.$parent.first != $parent.$parent.$parent) return $parent.$parent.$parent.$parent.second
                    return false
                }

                function getClosestRightTree() {
                    if ($parent.$parent.second != $parent) return $parent.$parent.first
                    if ($parent.$parent.$parent.second != $parent.$parent) {
                        const target = $parent.$parent.$parent.second;
                        if (!Array.isArray(target.first)) return target.first;
                        if (!Array.isArray(target.first.first)) return target.first.first;
                        if (!Array.isArray(target.first.first.first)) return target.first.first.first;
                        if (!Array.isArray(target.first.first.first.first)) return target.first.first.first.first;
                    }
                    if ($parent.$parent.$parent.$parent.second != $parent.$parent.$parent) {
                        const target = $parent.$parent.$parent.$parent.second;
                        if (!Array.isArray(target.first)) return target.first;
                        if (!Array.isArray(target.first.first)) return target.first.first;
                        if (!Array.isArray(target.first.first.first)) return target.first.first.first;
                        if (!Array.isArray(target.first.first.first.first)) return target.first.first.first.first;
                    }
                    return false
                }
            }
        }
    }
}

function performAddition(data) {
    const current = data[0];
    const next = data[1];
    const result = [current, next];
    data.splice(1, 1);
    data[0] = result;
}

function getTreeStructure(current) {
    const first = current[0];
    const second = current[1];
    let firstTree;
    let secondTree;
    if (Array.isArray(first)) {
        firstTree = getTreeStructure(first);
    } else {
        firstTree = {
            value: first,
        }
    }
    if (Array.isArray(second)) {
        secondTree = getTreeStructure(second);
    } else {
        secondTree = {
            value: second,
        }
    }
    const result = {
        first: firstTree,
        second: secondTree
    }
    result.first.$parent = result;
    result.second.$parent = result;
    return result
}