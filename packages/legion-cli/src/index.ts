#!/usr/bin/env node

import {program} from "commander";
import {matchInstall} from "./installCommand.js";
import {matchEncode} from "./matchEncode.js";
import {matchDecode} from "./matchDecode.js";

program
.name('legion')
.description('A command-line tool with various subcommands')
.option('-t, --timing', 'Measure the execution time');

matchInstall()
matchEncode()
matchDecode()

program.parse(process.argv);

const options = program.opts();

if (!process.argv.slice(2).length) {
    program.outputHelp();
} else {
    if (options.timing) {
        console.time('Execution time');
    }

// Add your main program logic here

    if (options.timing) {
        console.timeEnd('Execution time');
    }
}

