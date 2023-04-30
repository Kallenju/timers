import express, { Request } from "express";

import { collections } from "../database";

import User from "../entity/User";
import AuthData from "../entity/AuthData";

import { createUser } from "../service/user";
import { createSession } from "../service/authSession";

export default function signup(): express.RequestHandler<
  unknown,
  unknown,
  Partial<Pick<User, "username"> & Pick<AuthData, "password">>
> {
  return async (req: Request<unknown, unknown, Partial<Pick<User, "username"> & Pick<AuthData, "password">>>, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ error: 'Username and password are required' });
      return;
    }

    const usernameIsTaken = await collections.user.findOne({ username });

    if (usernameIsTaken) {
      res.status(409).json({ error: 'Username already taken' });
      return;
    }

    const userId = await createUser(username!, password!);
    const sessionId = await createSession(userId);

    res.status(200).json({ sessionId })
  };
}
