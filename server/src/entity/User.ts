import { ObjectId } from "mongodb";

export default class User {
  public _id: ObjectId;
  public createdAt = new Date();

  constructor(public username: string) {
    this.username = username;
  }
}
