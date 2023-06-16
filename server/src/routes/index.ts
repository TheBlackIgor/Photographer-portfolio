import express from "express";

import { routesAdmin } from "./adminPanel";

export const routes = express.Router();

routes.use(routesAdmin);
