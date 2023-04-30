import express, { Request } from "express";

import wss from "../websocket/initWebSocket";
import sendAllTimers from './websocket/sendAllTimers';
import { getUserWebSocket } from "../service/websocket";
import { createTimer } from "../service/timer";


export default function createAndSendTimer(): express.RequestHandler<unknown, unknown, { description?: string }> {
  return async (req: Request<unknown, unknown, { description?: string }>, res) => {
    const { description } = req.body;

    if (!description) {
      res.status(400).json({ error: 'You must provide a description to create a timer' });
      return;
    }

    let timerId;

    try {
      timerId = await createTimer(req.userId, description);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while creating the timer' });
      return;
    }

    const socket = getUserWebSocket(wss, req.userId)!;

    res.status(200).json({
      id: timerId,
    });

    res.on('finish', () => sendAllTimers(socket, req.userId));
  };
}
