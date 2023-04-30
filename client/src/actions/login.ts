import fetch from 'node-fetch';
import chalk from 'chalk';

import saveSessionId from '../utils/saveSessionId';
import initWebSocket from '../websocket/initWebSocket';

export default async function login(username: string, password: string) {
  const serverURL = `http://${process.env.HOST}:${process.env.PORT}`;

  let data: Awaited<ReturnType<typeof fetch>>;

  try {
    data = await fetch(`${serverURL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
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
    console.log(chalk.green('Logged in!'));
  }

  console.log('\n');
}
