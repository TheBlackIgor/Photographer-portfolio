import { Router } from "express";
import formidable from "formidable";
import * as fs from "fs";
import { Photo } from "../../models";
import { insertArray } from "../../db";
import sharp from "sharp";

const UPLOAD_PATH = "./src/uploads";
export const receivePhotos = Router();

receivePhotos.post("/api/upload/:folder", (req, res) => {
  const form = formidable({ multiples: true, keepExtensions: true });
  const response: Photo[] = [];
  const folder = req.params.folder;

  form.parse(req, async (err: any, fields: any, files: any) => {
    const keys = Object.keys(files);
    if (keys.length > 0) {
      const promises = keys.map(async (key, idx) => {
        return createImage(files[key], folder, idx);
      });

      try {
        const images = await Promise.all(promises);
        response.push(...images);
      } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
        return;
      }
    }
    insertArray(response, folder);
    res.end(JSON.stringify(response));
  });
});

const createImage = async (
  file: any,
  album: string,
  idx: number
): Promise<Photo> =>
  new Promise((resolve, reject) => {
    if (!fs.existsSync(UPLOAD_PATH + "/" + album))
      fs.mkdirSync(UPLOAD_PATH + "/" + album, { recursive: true });
    try {
      let splitedFilePath: string[] = [];
      if (file.path.includes("/")) splitedFilePath = file.path.split("/");
      else splitedFilePath = file.path.split("\\");

      const newFileName = splitedFilePath[splitedFilePath.length - 1];
      const thumbNewPath = `${UPLOAD_PATH}/${album}/thumb-${newFileName}`;
      const newPath = `${UPLOAD_PATH}/${album}/${newFileName}`;

      sharp(file.path).resize(1000).toFile(thumbNewPath);

      const extension = newFileName.split(".")[1];

      fs.writeFile(newPath, fs.readFileSync(file.path), function (err) {
        if (err) {
          return console.log(err);
        }
        resolve(
          new Photo(
            (new Date().getTime() + idx * 11).toString(),
            newPath,
            thumbNewPath,
            album,
            extension
          )
        );
      });
    } catch (error) {
      console.log(error);
      reject("formidable parse error");
    }
  });
