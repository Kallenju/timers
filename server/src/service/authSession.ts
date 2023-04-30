import { ObjectId } from "mongodb";

import { collections } from "../database";
import AuthSession from "../entity/AuthSession";

export async function createSession(userId: ObjectId): Promise<string> {
  const id = (await collections.authSession.insertOne(new AuthSession(userId))).insertedId;

  return id.toHexString();
}

export async function getSession(sessionId: string): Promise<AuthSession> {
  const session = await collections.authSession.findOne({ _id: new ObjectId(sessionId) });

  if (session === null) {
    throw new Error(`User not found`);
  }

  return session;
}
