import { Command } from 'commander';
import { executeCoreFunctionality } from './core';

const program = new Command();

program
  .version('1.0.0')
  .description('A command-line application for creating patterned apps')
  .action(() => {
    executeCoreFunctionality();
  });

program.parse(process.argv);