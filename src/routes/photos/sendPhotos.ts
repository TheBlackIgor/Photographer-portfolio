import { Router } from "express";
import { deleteOne, findAll, findOne } from "../../db";
import * as fs from "fs";
import { s3Client } from "../../aws";

export const sendPhotos = Router();

sendPhotos.post("/api/get/:folder", async (req, res) => {
  const folder = req.params.folder;
  const photos = (await findAll(folder))?.filter(
    (document) => document.id !== "index"
  );

  res.send(photos);
});

sendPhotos.delete("/api/image/:folder/:id", async (req, res) => {
  const id = req.params.id;
  const folder = req.params.folder;
  console.log(id, folder);
  const deletedFile = await deleteOne({ id: id }, folder);
  if (!deletedFile) {
    res.end();
    return;
  }

  const params = {
    Bucket: "reussgraphy",
    Key: `${deletedFile.path}`,
  };

  s3Client.deleteObject(params, (err: any, data: any) => {
    if (err) console.log(err, err.stack);
    else console.log(data);
  });

  params.Key = `${deletedFile.thumbPath}`;

  s3Client.deleteObject(params, (err: any, data: any) => {
    if (err) console.log(err, err.stack);
    else console.log(data);
  });

  const photos = (await findAll(folder))?.filter(
    (document) => document.id !== "index"
  );

  res.send(photos);
});
