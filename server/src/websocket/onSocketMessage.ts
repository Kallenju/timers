import type WebSocket from 'ws';

import sendAllTimers from "../controllers/websocket/sendAllTimers";
import sendActiveTimers from "../controllers/websocket/sendActiveTimers";
import sendStoppedTimers from "../controllers/websocket/sendStoppedTimers";

export default function onSocketMessage(message: WebSocket.RawData, socket: TimersWebSocket, userId: string) {
  let data: {
    type: string;
  };

  try {
    data = JSON.parse(message.toString());
  } catch (err) {
    throw err;
  }

  switch (data.type) {
    case 'sendAllTimers':
      sendAllTimers(socket, userId);
      break;
    case 'sendActiveTimers':
      sendActiveTimers(socket, userId);
      break;
    case 'sendStoppedTimers':
      sendStoppedTimers(socket, userId);
      break;
  }
}
