import fetch from 'node-fetch';
import chalk from 'chalk';

import saveSessionId from '../utils/saveSessionId';
import initWebSocket from '../websocket/initWebSocket';

export default async function signup(username: string, password: string) {
  let data: Awaited<ReturnType<typeof fetch>>;

  try {
    data = await fetch(`${serverURL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
  } catch (e) {
    console.log('\n')
    console.error(chalk.red('Could not connect to server'));
    process.exit(1);
  }

  const parsedData = await data.json() as {
    error: string;
  } | {
    sessionId: string;
  };

  console.log('\n');

  if ('error' in parsedData) {
    console.error(chalk.red(parsedData.error));
  } else {
    saveSessionId(parsedData.sessionId)
    initWebSocket(parsedData.sessionId)
    console.log(chalk.green('You have successfully signed up!'))
  }

  console.log('\n');
}
