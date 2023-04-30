/* eslint-disable @typescript-eslint/no-empty-interface */
import type WebSocket from 'ws';
import type readLine from 'readline';

import type ITimer from '../src/types/timer';

declare global {
  var serverURL: string;
  var sessionFilePath: string;
  var socket: TimersWebSocket | undefined;
  var rl: readLine.Interface & { stdoutMuted?: boolean };
  var timers: Map<string, ITimer>
  var timersIndex: Map<'new' | 'old', Map<string, undefined>>;

  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | "test";
      HOST: string;
      PORT: string;
    }
  }

  interface TimersWebSocket extends WebSocket {
    pingTimeout?: NodeJS.Timeout;
  }
}

export {};
