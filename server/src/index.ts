import express from "express";
import cors from "cors";
import { connectToMongoDB } from "db";
import { MongoClientOptions } from "mongodb";
const app = express();
require("dotenv").config();

const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
// app.use(require("./routes/record.js"));
// get driver connection

// perform a database connection when server starts
const mongoURL = process.env.MongoDB_ACCESS || "mongodb://localhost:27017";
const mongoOptions: MongoClientOptions = {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
};

app.listen(port, () => {
  connectToMongoDB(mongoURL, mongoOptions)
    .then((client) => {
      // Perform operations with the MongoDB client
      // For example:
      const db = client.db("reusgraphy");
      const collection = db.collection("images");
      // ... Perform CRUD operations here ...
    })
    .catch((error) => {
      // Handle error
      console.error("Failed to connect to MongoDB:", error);
    });
  console.log(`Server is running on port: ${port}`);
});
