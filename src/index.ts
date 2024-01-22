import express from "express";
import cors from "cors";
import { connectToMongoDB } from "./db";
import { MongoClientOptions } from "mongodb";
import { routes } from "./routes";

import * as bodyParser from "body-parser";
import path from "path";
const app = express();
require("dotenv").config();

const port = process.env.PORT || 80;

// Use cors middleware
// app.use(
//   cors({
//     origin: "https://reussgraphy.web.app", // Allow only this domain
//     methods: ["GET", "POST", "PUT", "DELETE"], // Allow only these HTTP methods
//     allowedHeaders: ["Content-Type", "Authorization"], // Allow only these headers
//   })
// );
app.use(cors());

// Other middleware configurations
app.use(bodyParser.urlencoded());
app.use(express.static(__dirname + "/static"));
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use("/", routes);

// perform a database connection when server starts
const mongoURL = process.env.MongoDB_ACCESS || "mongodb://localhost:27017";
const mongoOptions: MongoClientOptions = {};

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/static/index.html"));
});

app.listen(port, async () => {
  await connectToMongoDB(mongoURL, mongoOptions);

  console.log(`Server is running on port: ${port}`);
});

export default app;
