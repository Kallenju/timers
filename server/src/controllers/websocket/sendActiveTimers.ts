import WebSocket from 'ws';

import { getTimers } from '../../service/timer';

export default async function sendActiveTimers(socket: WebSocket.WebSocket, userId: string) {
  const timers = await getTimers({
    userId,
    isActive: 'true',
  })

  timers.forEach((timer) => {
    (timer as any & { id: string }).id = timer._id.toHexString();
  })

  socket.send(JSON.stringify({
    type: 'active_timers',
    timers,
  }));
}
