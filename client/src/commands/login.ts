import chalk from 'chalk';

import loginAction from '../actions/login';

export async function login() {
  console.log('\nPlease enter your credentials:');

  await new Promise<void>((resolve) => {
    rl.question(`${chalk.green('?')} Username: `, (username) => {
      // hidden password input
      global.rl.stdoutMuted = true;
      rl.question(`${chalk.green('?')} Password: `, async (password) => {
        await loginAction(username, password);

        global.rl.stdoutMuted = false;

        resolve();
      });
    });
  });
}
