import { Command } from 'commander';
import { executeMainLogic } from './main';

const program = new Command();

program
  .name('create-patterned-app')
  .description('A CLI for creating patterned applications')
  .version('1.0.0');

program
  .command('start')
  .description('Start the application')
  .action(() => {
    executeMainLogic();
  });

program.parse(process.argv);