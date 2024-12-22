import {program} from "commander";

export function matchEncode() {
    program
    .command('encode <file>')
    .description('Encode a file')
    .option('--dry-run', 'Simulate the encoding without actually encoding')
    .action((file: any, options: {
        dryRun: any;
    }) => {
        console.log(`Encoding ${file}${options.dryRun ? ' (dry run)' : ''}`);
    });
}