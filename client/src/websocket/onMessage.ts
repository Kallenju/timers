import type WebSocket from 'ws';

import type ITimer from '../types/timer';
import saveTimers from '../actions/saveTimers';

export default function onMessage(message: WebSocket.Data) {
  let data: {
    type: 'all_timers' | 'active_timers' | 'stopped_timers';
    timers: ITimer[];
  }

  try {
    data = JSON.parse(message.toString());
  } catch (error) {
    console.error(error);
    return;
  }

  if (data.type === 'all_timers' || data.type === 'active_timers' || data.type === 'stopped_timers') {
    saveTimers(data.timers)
  }
}
