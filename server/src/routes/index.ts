import express from "express";

import { routesAdmin } from "./adminPanel";
import { receivePhotos } from "./photos";

export const routes = express.Router();

routes.use(routesAdmin);
routes.use(receivePhotos);
