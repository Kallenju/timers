import chalk from 'chalk';

import stopTimerAction from '../actions/stopTimer';

export async function stopTimer() {
  console.log('\nPlease enter your credentials:');

  await new Promise<void>((resolve) => {
    rl.question(`${chalk.green('?')} Enter the id of the timer you want to stop: `, async (id) => {
      await stopTimerAction(id);
      resolve();
    });
  });
}
