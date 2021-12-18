import { d18_data, d18_data_test, single_line, single_line_v2 } from "./input.js";

// https://adventofcode.com/2021/day/18

// dayEighteen(single_line)
dayEighteen(single_line_v2)
// dayEighteen(d18_data_test)
// dayEighteen(d18_data)

function dayEighteen(inputData) {
    const data = JSON.parse(JSON.stringify(inputData));
    let tree;
    while (data.length > 1) {
        performAddition(data);
        const current = data[0];
        tree = getTreeStructure(current);
        updateTree(tree, 1);

        function updateTree(currentNode, nestLevel) {
            if (!currentNode) return;
            const { first, second, $parent } = currentNode;
            if (first && second) {
                updateDeeperLevels(currentNode);
            } 
            if (nestLevel > 3 && first?.value && second?.value) {
                explode();
            }

            function updateDeeperLevels(currentNode) {
                updateTree(currentNode.first, nestLevel + 1);
                updateTree(currentNode.second, nestLevel + 1);
            }



            function split(node) {
                const splitValueOne = Math.floor(node.value / 2);
                const splitValueTwo = Math.ceil(node.value / 2);
                const nodeToAdd = {};
                nodeToAdd.first = {
                    value: splitValueOne,
                    $parent: nodeToAdd
                }
                nodeToAdd.second = {
                    value: splitValueTwo,
                    $parent: nodeToAdd
                }
                nodeToAdd.$parent = node.$parent;
                if (node.$parent.second === node) node.$parent.second = nodeToAdd;
                else node.$parent.first = nodeToAdd;
                updateDeeperLevels(node);
            }

            function explode() {
                if (!first && !second) return;
                if ($parent.second === currentNode) explodeSecondNode();
                else explodeFirstNode();

                function explodeFirstNode() {
                    const closestRight = getClosestRightTree();
                    if (closestRight) {
                        closestRight.value += second.value;
                        if (closestRight.value >= 10) split(closestRight)
                    }

                    const closestLeft = getClosestLeftTree();
                    if (closestLeft) {
                        closestLeft.value += first.value
                        if (closestLeft.value >= 10) split(closestLeft)
                    }
                    $parent.first = {
                        value: 0,
                        $parent,
                    }
                }

                function explodeSecondNode() {
                    const closestLeft = getClosestLeftTree();
                    if (closestLeft) {
                        closestLeft.value += first.value;
                        if (closestLeft.value >= 10) split(closestLeft)
                    }
                    const closestRight = getClosestRightTree();
                    if (closestRight) {
                        closestRight.value += second.value
                        if (closestRight.value >= 10) split(closestRight)
                    }
                    $parent.second = {
                        value: 0,
                        $parent
                    };
                }

                function getClosestLeftTree() {
                    if ($parent.first != currentNode) {
                        let target = $parent.first;
                        if (target.value != null) return target;

                        while (target && target.value == null) target = target.second;
                        return target
                    }
                    if ($parent.$parent.first != $parent) {
                        let target = $parent.$parent.first
                        if (target.value != null) return target;

                        while (target && target.value == null) target = target.second;
                        return target
                    }
                    if ($parent.$parent.$parent.first != $parent.$parent) {
                        let target = $parent.$parent.$parent.first;
                        if (target.value != null) return target;

                        while (target && target.value == null) target = target.second;
                        return target
                    }
                    if ($parent.$parent.$parent.$parent.first != $parent.$parent.$parent) {
                        let target = $parent.$parent.$parent.$parent.first;
                        if (target.value != null) return target;

                        while (target && target.value == null) target = target.second;
                        return target
                    }
                    return false
                }

                function getClosestRightTree() {
                    if ($parent.second != currentNode) {
                        let target = $parent.second;
                        if (target.value != null) return target;

                        while (target && target.value == null) target = target.first;
                        return target
                    }
                    if ($parent.$parent.second != $parent) {
                        let target = $parent.$parent.second;
                        if (target.value != null) return target;

                        while (target && target.value == null) target = target.first;
                        return target
                    }
                    if ($parent.$parent.$parent.second != $parent.$parent) {
                        let target = $parent.$parent.$parent.second;
                        if (target.value != null) return target;

                        while (target && target.value == null) target = target.first;
                        return target
                    }
                    if ($parent.$parent.$parent.$parent.second != $parent.$parent.$parent) {
                        let target = $parent.$parent.$parent.$parent.second;
                        if (target.value != null) return target;

                        while (target && target.value == null) target = target.first;
                        return target
                    }
                    return false
                }
            }
        }
    }
    console.log(tree);

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