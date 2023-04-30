import chalk from 'chalk';

import getTimers from '../actions/getTimers';
import renderTimers from '../actions/renderTimers';

export function status(timerType?: 'new' | 'old', id?: string) {
  const isActive = timerType === 'new' ? true : timerType === 'old' ? false : undefined;
  const timers = getTimers(isActive, id);

  if (timers === undefined) {
    return;
  }

  if (timers === null || timers.length === 0) {
    console.log(`\n${chalk.red('No timer found')}`);
    return;
  }

  renderTimers(timers);
}
