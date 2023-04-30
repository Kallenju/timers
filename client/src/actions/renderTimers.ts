import chalk from 'chalk';
import Table from 'cli-table';

import type ITimer from '../types/timer';
import formatTime from '../utils/formatTime';
import formatDuration from '../utils/formatDuration';

export default function renderTimers(timers: ITimer[]) {
  const table = new Table({
    head: [chalk.blue('ID'), chalk.blue('Description'), chalk.blue('Start Date'), chalk.blue('Duration'), chalk.blue('Active')],
    colWidths: [30, 40, 15, 15, 10]
  });

  table.push(
    ...timers.map((timer: ITimer) => [
      timer.id,
      timer.description,
      formatTime(Date.parse(timer.start)),
      formatDuration(
        Date.parse(timer.start),
        timer.end !== null ? Date.parse(timer.end) : undefined
      ),
      timer.end === null ? 'Yes' : 'No'
  ]));

  console.log(table.toString());
}
