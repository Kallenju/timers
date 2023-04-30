import express from "express";

import { ObjectId } from "mongodb";
import { collections } from "../database";

export default function logout(): express.RequestHandler {
  return async (req, res) => {
    await collections.authSession.deleteOne({ _id: new ObjectId(req.sessionId) });
    res.status(200).json({})
  };
}
