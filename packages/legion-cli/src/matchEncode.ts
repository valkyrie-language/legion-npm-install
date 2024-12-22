import {program} from "commander";
import fs from "node:fs/promises";
import {encodeWasm} from "@valkyrie-language/legion-wasm32-wasi";
import path from "path";

export function matchEncode() {
    program
    .command('encode <INPUT> [OUTPUT]')
    .description('Encode a file')
    .option('--dry-run', 'Simulate the encoding without actually encoding')
    .option('--generate-dwarf', 'Generate DWARF debug information')
    .action(encodeCommand);
}

interface EncodeOptions {
    dryRun: boolean;
    generateDwarf: boolean,
}

async function encodeCommand(input: string, output: string | null, options: EncodeOptions) {
    let inputText = await fs.readFile(input, 'utf8');
    let bytes = encodeWasm(inputText, {...options})
    if (output === null) {
        let inputPath = path.parse(input);
        output = `${inputPath.dir}/${inputPath.name}.wasm`;
    }
    await fs.writeFile(output, bytes);
}