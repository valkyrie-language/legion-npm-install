import {program} from "commander";
import {decodeWasm, encodeWasm} from "@valkyrie-language/legion-wasm32-wasi";
import * as fs from "node:fs/promises";
import * as path from 'path';

export function matchDecode() {
    program
    .command('decode <INPUT> [OUTPUT]')
    .description('Decode an input file and save it to the output directory')
    .option('--dry-run', 'Simulate the decoding without actually decoding')
    .option('--skeleton-only', 'Only decode the skeleton of the file')
    .option('--name-unnamed', 'Name unnamed functions')
    .option('--fold-instructions', 'Fold instructions')
    .action(decodeCommand);
}

interface DecodeOptions {
    dryRun: boolean;
    skeletonOnly: boolean,
    nameUnnamed: boolean,
    foldInstructions: boolean
}

async function decodeCommand(input: string, output: string | null, options: DecodeOptions) {
    let inputBytes = await fs.readFile(input);
    let bytes = decodeWasm(inputBytes, {...options})
    if (output === null) {
        let inputPath = path.parse(input);
        output = `${inputPath.dir}/${inputPath.name}.wat`;
    }
    await fs.writeFile(output, bytes);
}