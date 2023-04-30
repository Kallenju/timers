import type ITimer from '../types/timer';

export default function saveTimers(timers: ITimer[]) {
  timers.forEach((timer: ITimer) => {

    global.timers.set(timer.id, timer);

    const newTimers = global.timersIndex.get('new')!

    if (timer.end === null) {
      newTimers.set(timer.id, undefined);
    } else {
      const oldTimers = global.timersIndex.get('old')!

      newTimers.delete(timer.id);
      oldTimers.set(timer.id, undefined);
    }
  });
}
