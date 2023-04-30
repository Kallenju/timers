import type WebSocket from 'ws';

export function getUserWebSocket(wss: WebSocket.Server<TimersWebSocket>, userId: string): TimersWebSocket | null {
  for (const socket of wss.clients) {
    if (socket.userId === userId) {
      return socket;
    }
  }
  return null;
};
