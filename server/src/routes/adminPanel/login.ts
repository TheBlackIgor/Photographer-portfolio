import { Router } from "express";
import { encryptPassword, decryptPassword } from "utils";

export const routesUser = Router();

routesUser.route("/api/validateSignup").post((req, res) => {});

routesUser.route("/api/login").post((req, res) => {});
