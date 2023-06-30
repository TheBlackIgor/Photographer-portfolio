import { Router } from "express";
import formidable from "formidable";
import * as fs from "fs";

export const receivePhotos = Router();

receivePhotos.post("/api/upload/:folder", (req, res) => {
  const form = formidable({ multiples: true, keepExtensions: true });

  let dir = "./app/uploads/" + req.params.folder;

  form.parse(req, (err, fields, files: any) => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
      return;
    }

    // Iterate through the files and save them
    O;
    for (const file of Object.values(files)) {
      const oldPath = file.path;
      const newPath = __dirname + "/uploads/" + file.name;

      fs.rename(oldPath, newPath, (error) => {
        if (error) {
          console.error(error);
          res.status(500).send("Internal Server Error");
        }
      });
    }

    res.send("Files uploaded successfully");
  });
});
