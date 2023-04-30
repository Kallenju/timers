import { ObjectId } from "mongodb";

export default class Timer {
  public _id: ObjectId;
  public createdAt = new Date();

  constructor(public userId: ObjectId, public start: Date, public end: Date | null, public description: string) {
    this.userId = userId;
    this.start = start;
    this.end = end;
    this.description = description;
  }
}
