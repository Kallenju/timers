import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

import dotenv from "dotenv";

dotenv.config({ path: path.join(__dirname, `../.env`) });

import os from "os";
import chalk from 'chalk';
import readLine from 'readline';

import * as commands from './commands';
import welcome from './welcome';
import logout from './actions/logout';

global.serverURL = `http://${process.env.HOST}:${process.env.PORT}`;
global.sessionFilePath = path.resolve(os.homedir(), `${os.type().match(/windows/i) ? "_" : "."}sb-timers-session`);
global.rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});
global.rl.stdoutMuted = false;
global.timers = new Map();
global.timersIndex = new Map([['new', new Map()], ['old', new Map()]]);

(rl as any)._writeToOutput = function _writeToOutput(stringToWrite: string) {
  if (stringToWrite.startsWith(`${chalk.green('?')} Password: `)) {
    const password = (stringToWrite.match(/Password:\s*(\S+)$/) || ['', ''])[1];
    const asterisks = '*'.repeat(password.length);
    const outputStr = stringToWrite.replace(password, asterisks);
    (rl as any).output.write(outputStr)
    return;
  }

  if (rl.stdoutMuted)
    (rl as any).output.write("*");
  else
    (rl as any).output.write(stringToWrite);
};

let isCommandRunning = false;

rl.on('line', async (input) => {
  const [command, arg1, arg2] = input.trim().split(' ');

  if (command === 'exit') {
    await commands['exit']();

    return;
  }

  if (
    !isCommandRunning &&
    commands[command as keyof typeof commands] !== undefined &&
    typeof commands[command as keyof typeof commands] === 'function'
  ) {
    isCommandRunning = true;
    if (command !== 'status') {
      await commands[command as keyof typeof commands]();
    } else {
      const timerType = arg1 === 'new' || arg1 === 'old' ? arg1 : undefined;
      const timerId = timerType === undefined ? arg1 : arg2;
      await commands['status'](timerType, timerId);
    }
    isCommandRunning = false;
  }

  rl.prompt();
});

rl.on('close', async () => {
  await logout();
  console.log(`\n${chalk.green('Bye!')}`);
  process.exit(0);
});

welcome()
