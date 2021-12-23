import * as fs from 'fs';
import * as path from 'path'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { Cuboid } from './utils.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

export function getInput(test) {
    const input = fs
        .readFileSync(path.join(__dirname, test ? './testInput.txt' : './input.txt'))
        .toString()
        .split('\r\n');

    const cuboids = [];
    input.forEach(line => {
        const on = line.split(" ")[0] == "on";
        const axisRanges = [];
        line.split(" ")[1].split(",").forEach(axis => {
            const range = axis.split("=")[1].split("..").map(x => parseInt(x));
            axisRanges.push(range);
        });

        cuboids.push(new Cuboid(...axisRanges, on));
    });
    return cuboids;

}
