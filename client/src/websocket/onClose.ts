export default function onClose(socket: TimersWebSocket) {
  clearTimeout(socket?.pingTimeout);
  socket.pingTimeout = undefined;
}
