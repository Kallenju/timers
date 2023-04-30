import chalk from 'chalk';

export async function help() {
  console.log('Commands:\n');
  console.log(chalk.yellow('login'), '                         Login to the app');
  console.log(chalk.yellow('signup'), '                        Signup to the app');
  console.log(chalk.yellow('logout'), '                        Logout from the app');
  console.log(chalk.yellow('createTimer'), '                   Create a new timer');
  console.log(chalk.yellow('stopTimer'), '                     Stop a timer');
  console.log(chalk.yellow('status [new/old] [id]'), '         Show the status of a timers or, if id is provided, of a specific timer');
  console.log('\n');
}
