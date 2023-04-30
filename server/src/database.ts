import { MongoClient, Collection, OptionalId } from "mongodb";
import User from "./entity/User";
import AuthData from "./entity/AuthData";
import AuthSession from "./entity/AuthSession";
import Timer from "./entity/Timer";

export const collections = {} as {
  user: Collection<OptionalId<User>>;
  authData: Collection<OptionalId<AuthData>>;
  authSession: Collection<OptionalId<AuthSession>>;
  timer: Collection<OptionalId<Timer>>;
};

export let client: MongoClient;

export async function connectToDatabase(): Promise<void> {
  client = new MongoClient(process.env.DB_CONN_STRING);

  await client.connect();

  const db = client.db(process.env.DB_NAME);

  await db.command({
    collMod: process.env.USER_COLLECTION_NAME,
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["username", "createdAt"],
        additionalProperties: false,
        properties: {
          _id: {},
          username: {
            bsonType: "string",
            description: "'username' is required and is a string",
          },
          createdAt: {
            bsonType: "date",
            description: "'createdAt' is required and is a date",
          },
        },
      },
    },
  });

  await db.command({
    collMod: process.env.AUTH_DATA_COLLECTION_NAME,
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["userId", "password", "salt", "createdAt"],
        additionalProperties: false,
        properties: {
          _id: {},
          userId: {
            bsonType: "objectId",
            description: "'username' is required and is a objectId",
          },
          password: {
            bsonType: "string",
            description: "'password' is required and is a string",
          },
          salt: {
            bsonType: "string",
            description: "'salt' is required and is a string",
          },
          createdAt: {
            bsonType: "date",
            description: "'createdAt' is required and is a date",
          },
        },
      },
    },
  });

  await db.command({
    collMod: process.env.AUTH_SESSION_COLLECTION_NAME,
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["userId", "createdAt"],
        additionalProperties: false,
        properties: {
          _id: {},
          userId: {
            bsonType: "objectId",
            description: "'username' is required and is a objectId",
          },
          createdAt: {
            bsonType: "date",
            description: "'createdAt' is required and is a date",
          },
        },
      },
    },
  });

  await db.command({
    collMod: process.env.TIMER_COLLECTION_NAME,
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["userId", "start", "description", "createdAt"],
        additionalProperties: false,
        properties: {
          _id: {},
          userId: {
            bsonType: "objectId",
            description: "'username' is required and is a objectId",
          },
          start: {
            bsonType: "date",
            description: "'start' is required and is a date",
          },
          end: {
            bsonType: ["date", "null"],
            description: "'end' is required and is a date",
          },
          description: {
            bsonType: "string",
            description: "'description' is required and is a string",
          },
          createdAt: {
            bsonType: "date",
            description: "'createdAt' is required and is a date",
          },
        },
      },
    },
  });

  const userCollection = db.collection<OptionalId<User>>(process.env.USER_COLLECTION_NAME);
  const authDataCollection = db.collection<OptionalId<AuthData>>(process.env.AUTH_DATA_COLLECTION_NAME);
  const authSessionCollection = db.collection<OptionalId<AuthSession>>(process.env.AUTH_SESSION_COLLECTION_NAME);
  const timerCollection = db.collection<OptionalId<Timer>>(process.env.TIMER_COLLECTION_NAME);

  collections.user = userCollection;
  collections.authData = authDataCollection;
  collections.authSession = authSessionCollection;
  collections.timer = timerCollection;
}
