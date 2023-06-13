import { MongoClient, MongoClientOptions } from "mongodb";
require("dotenv").config();

export const connectToMongoDB = async (
  url: string,
  options: MongoClientOptions
): Promise<MongoClient> => {
  try {
    const client = new MongoClient(url, options);
    await client.connect();
    console.log("Connected to MongoDB successfully!");
    return client;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
};
