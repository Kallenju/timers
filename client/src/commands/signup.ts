import chalk from 'chalk';

import signupAction from '../actions/signup';

import getSessionId from '../utils/getSessionId';

export async function signup() {
  if (getSessionId()) {
    console.error('\n', chalk.red('You are already logged in'));
    return;
  }

  console.log('\nPlease enter your credentials:');

  await new Promise<void>((resolve) => {
    rl.question(`${chalk.green('?')} Username: `, (username) => {
      // hidden password input
      global.rl.stdoutMuted = true;

      rl.question(`${chalk.green('?')} Password: `, async (password) => {
        await signupAction(username, password);

        global.rl.stdoutMuted = false;

        resolve();
      });
    });
  });
}
