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

    const emptyLineContents = '';
    const separatorIndex = input.findIndex(i => i === emptyLineContents);
    const imageEnhancementAlgorithm = input.slice(0, separatorIndex).join("");
    const image = input.slice(separatorIndex + 1).map(i => i.split(""));
    const result = {
        imageEnhancementAlgorithm,
        image
    }
    return result;
}