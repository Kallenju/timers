import express, { Request } from "express";

import { collections } from "../database";

import User from "../entity/User";
import AuthData from "../entity/AuthData";

import { validatePassword } from "../service/authData";
import { createSession } from "../service/authSession";

export default function login(): express.RequestHandler<
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

    const user = await collections.user.findOne({ username });

    if (!user) {
      res.status(401).json({ error: 'Invalid username' });
      return;
    }

    if (!(await validatePassword(user._id, password))) {
      res.status(401).json({ error: 'Invalid password' });
      return;
    }

    const sessionId = await createSession(user._id);

    res.status(200).json({ sessionId })
  };
}
