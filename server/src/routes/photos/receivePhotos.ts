import { Router, response } from "express";
import formidable from "formidable";
import * as fs from "fs";
import path from "path";
import { Photo } from "../../models";

const UPLOAD_PATH = "./uploads/";
export const receivePhotos = Router();

receivePhotos.post("/api/upload/:folder", (req, res) => {
  const form = formidable({ multiples: true, keepExtensions: true });
  const response: Photo[] = [];

  form.parse(req, async (err: any, fields: any, files: any) => {
    console.log(files);
    const keys = Object.keys(files);
    console.log(keys);
    if (keys.length > 0)
      keys.forEach(async (key) =>
        response.push(await createImage(files[key], req.params.folder))
      );
    setTimeout(() => {
      console.log(response);
      res.end(JSON.stringify(response));
    }, 2000);
  });
});

const createImage = async (file: any, album: string): Promise<Photo> =>
  new Promise((resolve, reject) => {
    const name = file.path.substring(file.path.lastIndexOf(path.sep));
    const newPath = path.join(UPLOAD_PATH, album, name);

    if (!fs.existsSync(path.join(UPLOAD_PATH, album))) {
      console.log();
      fs.mkdir(path.join(UPLOAD_PATH, album), async (err) => {
        fs.rename(file.path, newPath, async () => {
          resolve(new Photo(file.name, newPath, album));
        });
      });
    } else {
      fs.rename(file.path, newPath, async (err) => {
        resolve(new Photo(file.name, newPath, album));
      });
    }
  });
