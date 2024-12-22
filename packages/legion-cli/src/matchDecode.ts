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

export async function decodeCommand(input: string, output: string | undefined, options: DecodeOptions) {
    try {
        let inputBytes = await fs.readFile(input);
        let bytes = decodeWasm(inputBytes, {
            skeletonOnly: options.skeletonOnly || false,
            nameUnnamed: options.nameUnnamed || false,
            foldInstructions: options.foldInstructions || false
        })
        if (output === undefined) {
            let inputPath = path.parse(input);
            output = `${inputPath.dir}/${inputPath.name}.wat`;
        }
        if (options.dryRun) {
            console.log(`[Dry Run] Writing to ${output}`);
        } else {
            console.log(`Writing to ${output}`);
            await fs.writeFile(output, bytes);
        }
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}