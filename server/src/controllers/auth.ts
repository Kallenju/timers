import express from "express";

import { ObjectId } from "mongodb";
import { collections } from "../database";

export default function auth(): express.RequestHandler {
  return async (req, res, next): Promise<void> => {
    const sessionId = req.header("x-session-id");

    let authSession;

    if (sessionId) {
      authSession = await collections.authSession.findOne({ _id: new ObjectId(sessionId) });
    } else {
      res.status(401).json({ error: 'You need to login first' })
      return;
    }

    let user;

    if (authSession) {
      user = await collections.user.findOne({ _id: authSession.userId });
    } else {
      res.status(401).json({ error: 'Wrong session id' })
      return;
    }

    if (user) {
      req.userId = user._id.toString();
      req.sessionId = sessionId!;
    } else {
      res.status(401).json({ error: 'User associated with this session id is not found' })
      return;
    }

    next();
  };
}
