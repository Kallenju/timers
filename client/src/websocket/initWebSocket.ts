import WebSocket from 'ws';

import heartbeat from './heartbeat';
import onError from './onError';
import onClose from './onClose';
import onMessage from './onMessage';

export default function initWebSocket(sessionId: string) {
  const client: TimersWebSocket = new WebSocket(`ws://${process.env.HOST}:${process.env.PORT}?token=${sessionId}`);

  global.socket = client;

  client.on('error', onError);
  client.on('open', () => heartbeat(client));
  client.on('ping', () => heartbeat(client));
  client.on('close', () => onClose(client));
  client.on('message', onMessage);
}
