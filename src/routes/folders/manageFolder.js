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
exports.manageFolders = void 0;
const express_1 = require("express");
const db_1 = require("../../db");
exports.manageFolders = (0, express_1.Router)();
exports.manageFolders.post("/api/folder/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = JSON.parse(req.body.body);
    const folders = yield (0, db_1.findOne)({ id: "index" }, "folders");
    if (!folders) {
        yield (0, db_1.insertOne)({
            id: "index",
            folders: [{ name: body.name, image: "", title: body.title }],
        }, "folders");
    }
    else {
        yield (0, db_1.updateOne)({ id: "index" }, {
            folders: [
                ...folders.folders,
                { name: body.name, image: "", title: body.title },
            ],
        }, "folders");
    }
    (0, db_1.insertOne)({ id: "index", title: body.title, description: "", sections: [] }, body.name);
    res.end();
}));
exports.manageFolders.post("/api/folders/get", (req, res) => __awaiter(void 0, void 0, void 0, function* () { return res.end(JSON.stringify(yield (0, db_1.findOne)({ id: "index" }, "folders"))); }));
exports.manageFolders.post("/api/folder/:name", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.params.name;
    res.end(JSON.stringify(yield (0, db_1.findAll)(name)));
}));
exports.manageFolders.patch("/api/folder/:name", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const indexDoc = yield (0, db_1.findOne)({ id: "index" }, "folders");
    const name = req.params.name;
    const body = JSON.parse(req.body.body);
    const thisFolder = indexDoc.folders.find((folder) => folder.name === name);
    yield (0, db_1.updateOne)({ id: "index" }, {
        folders: [
            ...indexDoc.folders.filter((folder) => folder.name !== name),
            Object.assign(Object.assign({}, thisFolder), { title: body.title }),
        ],
    }, "folders");
    const currentIndex = yield (0, db_1.findOne)({ id: "index" }, name);
    yield (0, db_1.updateOne)({ id: "index" }, Object.assign(Object.assign({}, currentIndex), body), name);
    res.end();
}));
exports.manageFolders.patch("/api/imageFolder", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const folders = yield (0, db_1.findOne)({ id: "index" }, "folders");
    const body = JSON.parse(req.body.body);
    console.log(folders);
    const thisFolder = folders.folders.find((folder) => folder.name === body.name);
    yield (0, db_1.updateOne)({ id: "index" }, {
        folders: [
            ...folders.folders.filter((folder) => folder.name !== body.name),
            Object.assign(Object.assign({}, thisFolder), { image: body.image }),
        ],
    }, "folders");
    res.end();
}));
// manageFolders.get("/api/image/:folder/:id", async (req, res) => {
//   const id = req.params.id;
//   const folder = req.params.folder;
//   const photo = await findOne({ id: id }, folder);
//   if (!photo) {
//     res.end();
//     return;
//   }
//   const stat = fs.statSync(photo.path);
//   res.writeHead(200, {
//     "Content-Type": "image/" + photo.extension,
//     "Content-Length": stat.size,
//   });
//   fs.readFile(photo.path, (err, content) => {
//     // Serving the image
//     res.end(content);
//   });
// });
// manageFolders.delete("/api/image/:folder/:id", async (req, res) => {
//   const id = req.params.id;
//   const folder = req.params.folder;
//   const deletedFile = await deleteOne({ id: id }, folder);
//   if (!deletedFile) {
//     res.end();
//     return;
//   }
//   fs.unlink(deletedFile.path, (error) => {
//     if (error) return;
//   });
//   const photos = await findAll(folder);
//   res.send(photos);
// });
