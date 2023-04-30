import { ObjectId } from "mongodb";

import crypto from "crypto";

import { collections, client } from "../database";

import User from "../entity/User";
import AuthData from "../entity/AuthData";

export async function createUser(username: string, password: string): Promise<ObjectId> | never {
  const session = client.startSession();

  let userId: ObjectId;

  try {
    session.startTransaction();

    userId = (await collections.user.insertOne(new User(username), { session })).insertedId;

    const salt = crypto.randomBytes(16).toString("hex");
    password = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);

    await collections.authData.insertOne(new AuthData(userId, password, salt), { session });

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw new Error("Failed to create user");
  } finally {
    session.endSession();
  }

  return userId;
}
