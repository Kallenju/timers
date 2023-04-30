import sendAllTimers from "../controllers/websocket/sendAllTimers";
import sendActiveTimers from "../controllers/websocket/sendActiveTimers";

export default function onConnection(socket: TimersWebSocket, userId: string) {
  console.log(`Client #${userId} connected`);

  socket.isAlive = true;
  socket.userId = userId;

  sendAllTimers(socket, userId);

  socket.timerIntervalId = setInterval(() => {
    sendActiveTimers(socket, userId);
  }, 1000);
}
