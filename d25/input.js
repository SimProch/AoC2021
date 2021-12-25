import * as fs from 'fs';
import * as path from 'path'
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export function getInput(test) {
    const input = fs
        .readFileSync(path.join(__dirname, test ? './testInput.txt' : './input.txt'))
        .toString()
        .split('\r\n')
        .map(i => i.split(""));

    return input;
}
