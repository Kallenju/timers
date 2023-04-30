import { ObjectId } from "mongodb";

export default class AuthData {
  public _id: ObjectId;
  public createdAt = new Date();

  constructor(public userId: ObjectId, public password: string, public salt: string) {
    this.userId = userId;
    this.password = password;
    this.salt = salt;
  }
}
