import {program} from "commander";
import {encodeWasm} from "@valkyrie-language/legion-wasm32-wasi";
import * as fs from "node:fs/promises";

export function matchDecode() {
    program
    .command('decode <INPUT> [OUTPUT]')
    .description('Decode an input file and save it to the output directory')
    .option('--dry-run', 'Simulate the decoding without actually decoding')
    .action(encodeCommand);
}

interface EncodeOptions {
    dryRun: boolean;
    generateDwarf: boolean,
}

async function encodeCommand(input: string, output: string, options: EncodeOptions) {
    let inputText = await fs.readFile(input, 'utf8');
    let bytes = encodeWasm(inputText, {...options})
    await fs.writeFile(output, bytes);
}