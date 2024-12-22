import {Command, program} from "commander";
import fs from "node:fs/promises";
import {wasiPolyfill, watEncode} from "@valkyrie-language/legion-wasm32-wasi";
import path from "path";

export function matchEncode() {
    program
    .command('polyfill <INPUT> [OUTPUT]')
    .alias("shim")
    .description('Convert wasi component to js modules')
    .option('--dry-run', 'Simulate the encoding without actually encoding')
    .option('--generate-dwarf', 'Generate DWARF debug information')
    .action(polyfillCommand);
}

interface PolyfillOptions {
    dryRun: boolean;
    generateDwarf: boolean,
}

export async function polyfillCommand(input: string, output: string | undefined, options: PolyfillOptions) {
    try {
        let inputText = await fs.readFile(input);
        let files = wasiPolyfill(inputText, {
            name: "index",
            shim: [],
        })
        if (output === undefined) {
            let inputPath = path.parse(input);
            output = `${inputPath.dir}/${inputPath.name}/`;
        }

        for (let file of files) {
            if (options.dryRun) {
                console.log(`[Dry Run] Writing to ${output}`);
            } else {
                console.log(`Writing to ${output}`);
                await fs.writeFile(`${output}/${file[0]}`, file[1]);
            }
        }
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}