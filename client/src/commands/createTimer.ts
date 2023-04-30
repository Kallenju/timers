import chalk from 'chalk';

import createTimerAction from '../actions/createTimer';

export async function createTimer() {
  console.log('\nPlease enter your credentials:');

  await new Promise<void>((resolve) => {
    rl.question(`${chalk.green('?')} Enter a description for your timer: `, async (description) => {
      await createTimerAction(description);
      resolve();
    });
  });
}
