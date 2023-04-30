import { ObjectId } from "mongodb";

import { collections } from "../database";

import Timer from "../entity/Timer";

type GetTimersFilters = {
  _id?: string;
  userId: string;
  isActive?: "true" | "false";
};

export async function stopTimer(id: string): Promise<string> {
  let _id;

  try {
    _id = new ObjectId(id);
  } catch (error) {
    throw new Error('Invalid id');
  }

  const timer = await collections.timer.findOne({ _id });

  if (!timer) {
    throw new Error('Timer not found');
  }

  await collections.timer.updateOne({ _id: new ObjectId(id) }, { $set: { end: new Date() } });

  return timer._id.toHexString();
}

export async function getTimers(filters: GetTimersFilters): Promise<Timer[]> {
  const { _id, userId, isActive } = filters;

  const findQuery: {
    _id?: ObjectId;
    userId: ObjectId;
    end?: { $ne: null } | null;
  } = { userId: new ObjectId(userId) };

  if (_id) {
    findQuery._id = new ObjectId(_id);
  }

  if (isActive !== undefined) {
    findQuery.end = isActive === "true" ? null : { $ne: null };
  }

  return await collections.timer.find(findQuery).toArray();
}

export async function createTimer(userId: string, description: string): Promise<string> {
  const timer = new Timer(new ObjectId(userId), new Date(), null, description);

  const timerId = (await collections.timer.insertOne(timer)).insertedId;

  return timerId.toHexString();
}
