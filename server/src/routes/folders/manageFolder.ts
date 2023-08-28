import { Router } from "express";
import { findAll, findOne, insertOne, updateOne } from "../../db";

export const manageFolders = Router();

manageFolders.post("/api/folder/create", async (req, res) => {
  const body = JSON.parse(req.body.body);

  const folders = await findOne({ id: "index" }, "folders");
  if (!folders) {
    await insertOne(
      { id: "index", folders: [{ name: body.name, image: "" }] },
      "folders"
    );
  } else {
    await updateOne(
      { id: "index" },
      { folders: [...folders.folders, { name: body.name, image: "" }] },
      "folders"
    );
  }
  insertOne(
    { id: "index", title: body.title, description: "", sections: [] },
    body.name
  );

  res.end();
});

manageFolders.post("/api/folders/get", async (req, res) =>
  res.end(JSON.stringify(await findOne({ id: "index" }, "folders")))
);

manageFolders.post("/api/folder/:name", async (req, res) => {
  const name = req.params.name;

  res.end(JSON.stringify(await findAll(name)));
});

manageFolders.patch("/api/folder/:name", async (req, res) => {
  const name = req.params.name;
  const body = JSON.parse(req.body.body);
  const currentIndex = await findOne({ id: "index" }, name);
  await updateOne({ id: "index" }, { ...currentIndex, ...body }, name);
  res.end();
});

manageFolders.patch("/api/imageFolder", async (req, res) => {
  const folders = await findOne({ id: "index" }, "folders");
  const body = JSON.parse(req.body.body);

  await updateOne(
    { id: "index" },
    {
      folders: [
        ...folders!.folders.filter(
          (folder: { name: string }) => folder.name !== body.name
        ),
        { name: body.name, image: body.image },
      ],
    },
    "folders"
  );

  res.end();
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
