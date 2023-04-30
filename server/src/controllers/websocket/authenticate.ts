import stream from 'stream';
import WebSocket from 'ws';

import { getSession } from '../../service/authSession';
import onError from '../../websocket/onSocketError';

export default async function authenticate(request: TimersIncomingMessage, streamDuplex: stream.Duplex, wss: WebSocket.Server<WebSocket.WebSocket>, head: Buffer) {
  streamDuplex.on('error', onError);

  if (request.url === undefined) {
    streamDuplex.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
    streamDuplex.destroy();
    return;
  }

  const url = new URL(request.url, `http://${request.headers.host}`);
  const params = new URLSearchParams(url.search);
  const token = params.get('token');

  if (token === null) {
    streamDuplex.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
    streamDuplex.destroy();
    return;
  }

  let userId: string;

  try {
    userId = (await getSession(token)).userId.toHexString();
  } catch (err) {
    if (err instanceof Object && 'message' in err && err.message === 'User not found') {
      streamDuplex.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
      streamDuplex.destroy();
      return;
    }

    throw err;
  }

  request.userId = userId;

  streamDuplex.removeListener('error', onError);

  wss.handleUpgrade(request, streamDuplex, head, (socket) => {
    wss.emit('connection', socket, request);
  });
};
