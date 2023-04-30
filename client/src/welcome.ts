import chalk from 'chalk';

export default function welcome() {
  console.clear();
  console.log(`${chalk.green('Welcome to the Timers app!')}\n\n`);

  rl.emit('line', 'help');
}
