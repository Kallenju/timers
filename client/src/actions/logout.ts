import fetch from 'node-fetch';
import chalk from 'chalk';

import getSessionId from '../utils/getSessionId'
import deleteSessionId from '../utils/deleteSessionId'

export default async function logout(silent = false) {
  if (!silent) {
    console.log('\n\nLogging out...');
  }

  const token = getSessionId();

  if (token) {
    try {
      await fetch(`${serverURL}/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-session-id': getSessionId()
        },
      })
    } catch (e) {
      console.log('\n')
      console.error(chalk.red('Could not connect to server'));
      process.exit(1);
    }

    deleteSessionId();
  }

  global.socket?.close();
  global.socket = undefined;
  global.timers = new Map();
  global.timersIndex = new Map([['new', new Map()], ['old', new Map()]]);

  if (!silent) {
    console.log(chalk.green('Logged out!'));
  }
}
