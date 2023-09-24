import express from "express";

import { routesAdmin } from "./adminPanel";
import { receivePhotos, sendPhotos } from "./photos";
import { manageFolders } from "./folders";
import { contactRoutes } from "./contact";

export const routes = express.Router();

routes.get("/api/workingCheck", (req, res) => {
  res.send("API working");
});

routes.use(routesAdmin);
routes.use(receivePhotos);
routes.use(sendPhotos);
routes.use(manageFolders);
routes.use(contactRoutes);
