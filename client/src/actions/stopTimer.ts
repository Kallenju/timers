import fetch from 'node-fetch';
import chalk from 'chalk';

import getSessionId from '../utils/getSessionId';

export default async function stopTimer(id: string) {
  if (global.socket === undefined) {
    console.error('\n',chalk.red('You need to login first'));
    return;
  }

  let data: Awaited<ReturnType<typeof fetch>>;

  try {
    data = await fetch(`${serverURL}/api/timers/${id}/stop`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-session-id': getSessionId(),
      },
    })
  } catch (e) {
    console.log('\n')
    console.error(chalk.red('Could not connect to server'));
    process.exit(1);
  }

  const parsedData = await data.json() as {
    error: string;
  } | {
    id: string;
  };

  console.log('\n');

  if ('error' in parsedData) {
    console.error(chalk.red(parsedData.error));
  } else {
    console.log('⏲', chalk.green(`Timer #${parsedData.id} stopped!`));
  }

  console.log('\n');
}
