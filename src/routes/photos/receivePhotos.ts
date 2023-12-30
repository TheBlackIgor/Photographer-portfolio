import { Router } from "express";
import { Photo } from "../../models";
import { Upload } from "@aws-sdk/lib-storage";
import { s3Client } from "../../aws";
import { v4 as uuidv4 } from "uuid";
import formidable from "formidable";
import { Transform } from "stream";
import { insertArray } from "../../db";
import sharp from "sharp";

export const receivePhotos = Router();

receivePhotos.post("/api/upload/:folder", async (req, res) => {
  const form = formidable({ multiples: true, keepExtensions: true });
  const response: Photo[] = [];
  const folder = req.params.folder;

  // Counter to keep track of the number of files being processed
  let filesProcessed = 0;

  // Callback to handle the completion of processing all files

  let length = 0;

  form.parse(req, async (err: any, fields: any, files: any) => {
    length = Object.keys(files).length;
  });

  const finishProcessing = () => {
    // Check if all files have been processed
    if (filesProcessed === length) {
      // All files have been processed, perform any final actions here
      insertArray(response, folder);
      res.json(response);
    }
  };

  form.on("error", (err: any) => {
    console.log(err.message);
  });

  form.on("fileBegin", async (_formName: any, file: any) => {
    console.log(file);
    const id = uuidv4();
    const extension = file.newFilename.split(".").pop();
    const thumbNewPath = `${folder}/thumb-${id}.${extension}`;
    const newPath = `${folder}/${id}.${extension}`;

    file.open = async function () {
      this._writeStream = new Transform({
        transform(chunk, encoding, callback) {
          callback(null, chunk);
        },
      });

      this._writeStream.on("finish", () => {
        // File processing is complete
        filesProcessed++;
        response.push(new Photo(id, newPath, thumbNewPath, folder, extension));
        finishProcessing();
      });

      /**
       * Upload the file to S3
       */
      new Upload({
        client: s3Client,
        params: {
          Bucket: "reussgraphy",
          Key: newPath,
          Body: this._writeStream,
          ACL: "public-read",
        },
      })
        .done()
        .then(() => {
          this.emit("successUpload", {
            name: "successUpload",
            value: "File uploaded successfully",
          });
          this._writeStream.end();
        })
        .catch((err) => {
          console.log(err);
          this.emit("error", err);
        });

      /**
       * Upload the thumbnail to S3
       */
      new Upload({
        client: s3Client,
        params: {
          Bucket: "reussgraphy",
          Key: thumbNewPath,
          Body: this._writeStream.pipe(sharp().resize(1000).jpeg()),
          ACL: "public-read",
        },
      })
        .done()
        .then(() => {
          this.emit("successUpload", {
            name: "successUpload",
            value: "File uploaded successfully",
          });
          this._writeStream.end();
        })
        .catch((err) => {
          console.log(err);
          this.emit("error", err);
        });
    };
  });
});
