export default function onSocketClose(socket: TimersWebSocket, userId: string)  {
  clearInterval(socket.timerIntervalId);
  console.log(`Client #${userId} disconnected`);
}
