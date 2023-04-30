import chalk from 'chalk';

export default function heartbeat(socket: TimersWebSocket) {
  clearTimeout(socket.pingTimeout);

  socket.pingTimeout = setTimeout(() => {
    console.log('\n', chalk.red('Terminating connection due to server heartbeat timeout'));
    socket.terminate();
    process.exit(1);
  }, 31000);
}
