import crypto from "crypto";
import { ObjectId } from "mongodb";

import { collections } from "../database";

export async function validatePassword(userId: ObjectId, password: string): Promise<boolean> | never {
  const authData = await collections.authData.findOne({ userId });

  if (!authData) {
    throw new Error(`User not found`);
  }

  const hash = crypto.pbkdf2Sync(password, authData.salt, 1000, 64, `sha512`).toString(`hex`);

  return authData.password === hash;
}
