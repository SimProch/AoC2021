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

    return input.map(line => {
        const status = line.slice(0, 2) == 'on' ? 'on' : 'off';
        line = status === 'on' ? line.slice(3) : line.slice(4);
        const x = getValue();
        const y = getValue();
        const z = getValue();
        return {
            status,
            x,
            y,
            z
        }


        function getValue() {
            const separator = line.indexOf(",")
            const range = line.slice(2, separator === -1 ? undefined : separator);
            const dotSeparator = range.indexOf("..");
            const from = +range.slice(0, dotSeparator);
            const to = +range.slice(dotSeparator + 2)
            line = line.slice(separator + 1);
            
            return {
                from,
                to
            }
        }
    });

}
