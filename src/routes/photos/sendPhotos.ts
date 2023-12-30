import { Router } from "express";
import { deleteOne, findAll, findOne } from "../../db";
import * as fs from "fs";

export const sendPhotos = Router();

sendPhotos.post("/api/get/:folder", async (req, res) => {
  const folder = req.params.folder;
  const photos = (await findAll(folder))?.filter(
    (document) => document.id !== "index"
  );
  res.send(photos);
});

sendPhotos.get("/api/image/:folder/:id", async (req, res) => {
  const id = req.params.id.split(".")[0];
  const folder = req.params.folder;
  const photo = await findOne({ id: id }, folder);

  if (!photo) {
    res.end();
    return;
  }
  const stat = fs.statSync(photo.path);

  res.writeHead(200, {
    "Content-Type": "image/" + photo.extension,
    "Content-Length": stat.size,
  });

  fs.readFile(photo.path, (err, content) => {
    // Serving the image
    res.end(content);
  });
});

sendPhotos.get("/api/thumb/:folder/:id", async (req, res) => {
  const id = req.params.id.split(".")[0];
  const folder = req.params.folder;
  const photo = await findOne({ id: id }, folder);

  if (!photo) {
    res.end();
    return;
  }

  fs.readFile(photo.thumbPath, (err, content) => {
    // Serving the image
    res.end(content);
  });
});

sendPhotos.delete("/api/image/:folder/:id", async (req, res) => {
  const id = req.params.id;
  const folder = req.params.folder;

  const deletedFile = await deleteOne({ id: id }, folder);
  if (!deletedFile) {
    res.end();
    return;
  }

  fs.unlink(deletedFile.path, (error) => {
    if (error) return;
  });
  fs.unlink(deletedFile.thumbPath, (error) => {
    if (error) return;
  });

  const photos = (await findAll(folder))?.filter(
    (document) => document.id !== "index"
  );

  res.send(photos);
});
