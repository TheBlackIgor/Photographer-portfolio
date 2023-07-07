import { Router } from "express";
import { deleteOne, findAll, findOne, insertOne, updateOne } from "../../db";
import * as fs from "fs";

export const manageFolders = Router();

manageFolders.post("/api/folder/create", async (req, res) => {
  const body = JSON.parse(req.body.body);

  const folders = await findOne({ id: "index" }, "folders");
  if (!folders) {
    await insertOne({ id: "index", folders: [body.name] }, "folders");
  } else {
    await updateOne(
      { id: "index" },
      { folders: [...folders.folders, body.name] },
      "folders"
    );
  }
  insertOne(
    { id: "index", data: JSON.stringify({ title: body.title }) },
    body.name
  );

  res.end();
});

manageFolders.post("/api/folders/get", async (req, res) => {
  const folders = await findOne({ id: "index" }, "folders");

  res.writeHead(200, {
    "Content-Type": "application/json",
  });

  res.end(JSON.stringify(folders));
});

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
