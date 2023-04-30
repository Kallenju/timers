import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, `../.env.${process.env.NODE_ENV}`) });

import { createServer } from 'http';

import { connectToDatabase } from "./database";
import app from "./app";
import authenticate from "./controllers/websocket/authenticate";
import wss from "./websocket/initWebSocket";
import "./websocket/initWebSocket";
import "./router/render";
import "./router/auth";
import "./router/timer";

const server = createServer(app);

server.on('upgrade', (request: TimersIncomingMessage, streamDuplex, head) => {
  authenticate(request, streamDuplex, wss, head);
});

connectToDatabase().then(() => {
  const port = process.env.PORT;

  server.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
  });
});
