import chalk from 'chalk';

import logoutAction from '../actions/logout';

export async function logout() {
  await new Promise<void>((resolve) => {
    rl.question(`${chalk.red('Are you sure you want to logout?')} (y/n): `, async (answer) => {
      if (answer === 'y') {
        await logoutAction()
      }

      resolve();
    });
  });
}
