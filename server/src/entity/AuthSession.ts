import { ObjectId } from "mongodb";

export default class AuthSession {
  public _id: ObjectId;
  public createdAt = new Date();

  constructor(public userId: ObjectId) {
    this.userId = userId;
  }
}
