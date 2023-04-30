/* eslint-disable @typescript-eslint/no-empty-interface */
import type { IncomingMessage } from "http";
import type { WebSocket } from "ws";

type TimerParams = {
  userId: string;
  sessionId: string;
};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | "test";
      PORT: string;
      DB_CONN_STRING: string;
      DB_NAME: string;
      USER_COLLECTION_NAME: string;
      AUTH_DATA_COLLECTION_NAME: string;
      AUTH_SESSION_COLLECTION_NAME: string;
      TIMER_COLLECTION_NAME: string;
    }
  }

  namespace Express {
    interface Request extends TimerParams { }
  }

  interface TimersIncomingMessage extends IncomingMessage, TimerParams {
    user: User;
    userId: string;
    sessionId: string;
  }

  interface TimersWebSocket extends WebSocket {
    isAlive: boolean;
    userId: string;
    timerIntervalId: NodeJS.Timeout;
  }
}

export {};
