import { Router } from "express";
import { findAll, findOne } from "../../db";
import { Photo } from "../../models";
import * as fs from "fs";

export const sendPhotos = Router();

sendPhotos.post("/api/get/:folder", async (req, res) => {
  const folder = req.params.folder;
  const photos = await findAll(folder);

  console.log(photos);

  res.send(photos);
});

sendPhotos.get("/api/image/:folder/:id", async (req, res) => {
  const id = req.params.id;
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
