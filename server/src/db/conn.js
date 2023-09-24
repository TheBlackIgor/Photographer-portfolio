"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOne = exports.deleteOne = exports.findOne = exports.findAll = exports.insertArray = exports.insertOne = exports.connectToMongoDB = void 0;
const mongodb_1 = require("mongodb");
require("dotenv").config();
let db;
const connectToMongoDB = (url, options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = new mongodb_1.MongoClient(url, options);
        yield client.connect();
        console.log("Connected to MongoDB successfully!");
        db = client.db("reusgraphy");
        // ... Perform CRUD operations here ...
    }
    catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        throw error;
    }
});
exports.connectToMongoDB = connectToMongoDB;
const insertOne = (object, collection) => {
    if (db)
        db.collection(collection).insertOne(object);
};
exports.insertOne = insertOne;
const insertArray = (objects, collection) => {
    objects.forEach((object) => db && db.collection(collection).insertOne(object));
};
exports.insertArray = insertArray;
const findAll = (collection) => __awaiter(void 0, void 0, void 0, function* () {
    if (db)
        return db.collection(collection).find().toArray();
});
exports.findAll = findAll;
const findOne = (query, collection) => __awaiter(void 0, void 0, void 0, function* () {
    if (db)
        return db.collection(collection).findOne(query);
});
exports.findOne = findOne;
const deleteOne = (query, collection) => __awaiter(void 0, void 0, void 0, function* () {
    if (db) {
        const document = (0, exports.findOne)(query, collection);
        db.collection(collection).deleteOne(query);
        return document;
    }
});
exports.deleteOne = deleteOne;
const updateOne = (query, update, collection) => __awaiter(void 0, void 0, void 0, function* () {
    if (db)
        db.collection(collection).updateOne(query, { $set: update });
});
exports.updateOne = updateOne;
