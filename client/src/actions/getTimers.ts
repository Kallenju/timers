import chalk from 'chalk';

export default function getTimers(isActive?: boolean, timerId?: string) {
  if (global.socket === undefined) {
    console.error(chalk.red('You need to login first'));
    return;
  }

  if (timerId !== undefined) {
    const timer = global.timers.get(timerId);

    if (timer === undefined) {
      return null;
    }

    if (isActive === true && timer.end !== null) {
      return null;
    }

    if (isActive === false && timer.end === null) {
      return null;
    }

    return [timer];
  }

  if (isActive === undefined) {
    return [...global.timers.values()];
  }

  const timersIds = global.timersIndex.get(isActive ? 'new' : 'old')!;

  return [...timersIds.keys()].map((timerId: string) => global.timers.get(timerId)!);
}
