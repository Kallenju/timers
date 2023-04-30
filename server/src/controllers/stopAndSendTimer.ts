import express, { Request } from "express";

import wss from "../websocket/initWebSocket";
import sendAllTimers from './websocket/sendAllTimers';
import { getUserWebSocket } from "../service/websocket";
import { stopTimer } from "../service/timer";

export default function stopAndSendTimer(): express.RequestHandler<{ id?: string }> {
  return async (req: Request<{ id?: string }>, res) => {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ error: 'You must provide an id to stop a timer' });
      return;
    }

    let timerId;

    try {
      timerId = await stopTimer(id);
    } catch (error) {
      if (error instanceof Error && (error.message === 'Timer not found' || error.message === 'Invalid id')) {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An error occurred while stopping the timer' });
      }

      return;
    }

    const socket = getUserWebSocket(wss, req.userId)!;

    res.status(200).json({
      id: timerId,
    });

    res.on('finish', () => sendAllTimers(socket, req.userId));
  };
}
