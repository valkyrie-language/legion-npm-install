import {program} from "commander";

export function matchInstall() {
    program
    .command('install [NAME]')
    .alias('i')
    .description('Install a new component')
    .option('--dry-run', 'Simulate the installation without actually installing')
    .action(installCommand);
}
interface InstallOptions {
    dryRun: boolean;
}

async function installCommand(name: string, options: InstallOptions) {
    console.log(`Installing ${name}${options.dryRun ? ' (dry run)' : ''}`);
}