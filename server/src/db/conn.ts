import { MongoClient, MongoClientOptions } from "mongodb";
require("dotenv").config();
import { ObjectId } from "mongodb";
import { Db } from "mongodb";

let db: Db | undefined;

export const connectToMongoDB = async (
  url: string,
  options: MongoClientOptions
) => {
  try {
    const client = new MongoClient(url, options);
    await client.connect();
    console.log("Connected to MongoDB successfully!");
    db = client.db("reusgraphy");
    // ... Perform CRUD operations here ...
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
};

export const insertOne = (object: any, collection: string) => {
  if (db) db.collection(collection).insertOne(object);
};

export const insertArray = (objects: any[], collection: string) => {
  objects.forEach(
    (object) => db && db.collection(collection).insertOne(object)
  );
};

export const findAll = async (collection: string) => {
  if (db) return db.collection(collection).find().toArray();
};
export const findOne = async (query: any, collection: string) => {
  if (db) return db.collection(collection).findOne(query);
};
