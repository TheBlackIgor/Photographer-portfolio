import express from "express";

import { routesAdmin } from "./adminPanel";
import { receivePhotos, sendPhotos } from "./photos";
import { manageFolders } from "./folders";

export const routes = express.Router();

routes.use(routesAdmin);
routes.use(receivePhotos);
routes.use(sendPhotos);
routes.use(manageFolders);
