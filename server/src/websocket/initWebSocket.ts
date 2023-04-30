import { WebSocketServer } from 'ws';

import sendAllTimers from "../controllers/websocket/sendAllTimers";

import onConnection from "./onConnection";

import onSocketError from "./onSocketError";
import onSocketPong from "./onSocketPong";
import onSocketClose from "./onSocketClose";
import onSocketMessage from "./onSocketMessage";

const wss = new WebSocketServer<TimersWebSocket>({ noServer: true });

const pongIntervalId = setInterval(() => {
  wss.clients.forEach(socket => {
    if (socket.isAlive === false) return socket.terminate();

    socket.isAlive = false;
    socket.ping();
  });
}, 30000);

wss.on('connection', async (socket: TimersWebSocket, request: TimersIncomingMessage) => {
  onConnection(socket, request.userId);

  socket.on('error', onSocketError);
  socket.on('close', () => onSocketClose(socket, request.userId));
  socket.on('pong', () => onSocketPong(socket));
  socket.on('message', (message) => onSocketMessage(message, socket, request.userId));
});

wss.on('close', () => {
  clearInterval(pongIntervalId);
});

export default wss;
