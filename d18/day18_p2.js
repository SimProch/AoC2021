import * as fs from "fs";

const input = getInput();
class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
        this.parent = null;
    }
}

function getInput() {
    return fs
        .readFileSync('./input.txt')
        .toString()
        .split('\r\n')
        .filter(line => line !== '');
}

console.log('Part 2:', dayEighteen(input));


function dayEighteen(input) {
    let maxMagnitude = 0;

    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input.length; j++) {
            const root = mergeTrees(constructTree(input[i], null), constructTree(input[j], null));
            reduce(root);
            maxMagnitude = Math.max(maxMagnitude, calculateMagnitude(root));
        }
    }

    return maxMagnitude;
};


function constructTree(string, parent) {
    const root = new TreeNode(-1);
    root.parent = parent;

    let open = 0;
    let leftString = '';
    let rightString = '';

    for (let i = 0; i < string.length; i++) {
        const current = string[i]
        if (current === '[') {
            open++;
            if (open > 1) leftString += current;
        } else if (current === ']') {
            open--;
            leftString += current;
        } else if (current === ',' && open === 1) {
            rightString = string.slice(i + 1, -1);
            break;
        } else leftString += current;
    }

    if (leftString.length > 1) {
        root.left = constructTree(leftString, root);
    } else {
        root.left = new TreeNode(parseInt(leftString));
        root.left.parent = root;
    }

    if (rightString.length > 1) {
        root.right = constructTree(rightString, root);
    } else {
        root.right = new TreeNode(parseInt(rightString));
        root.right.parent = root;
    }

    return root;
}

function mergeTrees(a, b) {
    const newRoot = new TreeNode(-1);
    newRoot.left = a;
    newRoot.right = b;
    a.parent = newRoot;
    b.parent = newRoot;
    return newRoot;
};


function reduce(root) {
    let madeChange = true;

    while (madeChange) {
        madeChange = false;
        const explodeNode = getExplodeNode(root);

        if (explodeNode) {
            explode(explodeNode);
            madeChange = true;
        } else {
            const splitNode = getSplitNode(root);
            if (splitNode) {
                split(splitNode);
                madeChange = true;
            }
        }
    }
};


function getExplodeNode(node, depth = 0) {
    if (!node) return null;
    if (depth >= 4 && node.val === -1 && node.left.val !== -1 && node.right.val !== -1) return node;
    return getExplodeNode(node.left, depth + 1) || getExplodeNode(node.right, depth + 1);
};

function explode(node) {
    const _explode = (node, prevNode, addVal, dir, traversingUp) => {
        if (!node[dir]) return;

        if (node[dir] !== prevNode) {
            if (traversingUp && node[dir].val === -1)
                _explode(node[dir], null, addVal, dir === 'left' ? 'right' : 'left', false);
            else if (node[dir].val === -1) _explode(node[dir], null, addVal, dir, traversingUp);
            else node[dir].val += addVal;
        } else if (node.parent) {
            _explode(node.parent, node, addVal, dir, traversingUp);
        }
    };

    const leftVal = node.left.val;
    const rightVal = node.right.val;
    node.val = 0;
    node.left = null;
    node.right = null;
    _explode(node.parent, node, leftVal, 'left', true);
    _explode(node.parent, node, rightVal, 'right', true);
};

function getSplitNode(node) {
    if (!node) return null;
    if (node.val > 9) return node;
    return getSplitNode(node.left) || getSplitNode(node.right);
};

function split(node) {
    const val = node.val;
    node.val = -1;
    node.left = new TreeNode(Math.floor(val / 2));
    node.right = new TreeNode(Math.ceil(val / 2));
    node.left.parent = node;
    node.right.parent = node;
};

function calculateMagnitude(node) {
    if (!node) return 0;
    if (node.val !== -1) return node.val;
    return 3 * calculateMagnitude(node.left) + 2 * calculateMagnitude(node.right);
};
