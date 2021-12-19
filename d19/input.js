import * as fs from 'fs';
import * as path from 'path'
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export function getInput(test) {
    const input = fs
        .readFileSync(path.join(__dirname, test ? './testInput.txt' : './input.txt'))
        .toString()
        .split('\r\n');

    const result = {};
    let lastKey;
    let hasThreeDigits = false;
    for (let i = 0; i < input.length; i++) {
        const current = input[i];
        if (current == '') continue;

        const scannerIndex = current.indexOf('scanner')
        hasThreeDigits = hasThreeDigits || current.indexOf('10')
        if (scannerIndex > -1) {
            const length = hasThreeDigits ? 10 : 9
            lastKey = current.slice(scannerIndex, scannerIndex + length)
            result[lastKey] = [];
            continue;
        }

        const [x, y, z] = current.split(",")
        result[lastKey].push([+x, +y, +z])
    }
    return result;
}