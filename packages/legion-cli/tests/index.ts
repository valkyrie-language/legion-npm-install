
import { program } from 'commander';
import { installCommand } from './installCommand';
import { createTestProgram } from 'commander-test-utils';

describe('legion command-line tool', () => {
    let testProgram: ReturnType<typeof createTestProgram>;

    beforeEach(() => {
        testProgram = createTestProgram(program);
        program
        .name('legion')
        .description('A command-line tool with various subcommands')
        .option('-t, --timing', 'Measure the execution time')
        .command('install [NAME]')
        .alias('i')
        .description('Install a new component')
        .option('--dry-run', 'Simulate the installation without actually installing')
        .action(installCommand);
    });

    test('should display the help menu', async () => {
        const { stdout, stderr } = await testProgram.run(['--help']);
        expect(stdout).toContain('Usage: legion [options]');
        expect(stderr).toBe('');
    });

    test('should install a new component with dry-run', async () => {
        const { stdout, stderr } = await testProgram.run(['install', 'component-name', '--dry-run']);
        expect(stdout).toContain('Simulating the installation of component-name');
        expect(stderr).toBe('');
    });

    test('should measure the execution time', async () => {
        const { stdout, stderr } = await testProgram.run(['-t', 'install', 'component-name']);
        expect(stdout).toContain('Execution time:');
        expect(stderr).toBe('');
    });
});

