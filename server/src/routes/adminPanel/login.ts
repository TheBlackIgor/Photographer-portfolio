import { Router, response } from "express";
import { encryptPassword, decryptPassword } from "src/utils";

export const routesAdmin = Router();

routesAdmin.route("/api/tokenExpire").post((req, res) => {
  response.end("Hello");
});

routesAdmin.route("/api/login").post((req, res) => {
  response.end("Hello");
});
