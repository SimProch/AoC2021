import * as fs from 'fs';
import * as path from 'path'
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export function getInput() {
    const input = fs
        .readFileSync(path.join(__dirname, './input.txt'))
        .toString()
        .split('\r\n');

    const result = input.map(i => {
        const [operation, variable, value] = i.split(" ")
        return { operation, variable, value }
    })
    return result;
}

export function getCopiedInput() {
    const input = fs
        .readFileSync(path.join(__dirname, './input.txt'))
        .toString()
        .split('\r\n');

    const result = input.map(i => i.split(" "))
    return result;
}
