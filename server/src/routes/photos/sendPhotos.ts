import { Router } from "express";
import { findAll } from "../../db";

export const sendPhotos = Router();

sendPhotos.post("/api/get/:folder", async (req, res) => {
  const folder = req.params.folder;
  const photos = await findAll(folder);

  console.log(photos);

  res.send(photos);
});
