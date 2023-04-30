export default function onSocketPong(socket: TimersWebSocket) {
  socket.isAlive = true;
}
