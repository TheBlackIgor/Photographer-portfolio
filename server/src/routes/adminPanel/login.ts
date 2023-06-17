import { Router } from "express";
import { encryptPassword, decryptPassword, createToken } from "../../utils";
require("dotenv").config();
import { LoginRequestBody } from "./types";

export const routesAdmin = Router();

routesAdmin.route("/api/tokenExpire").post((req, res) => {
  res.end('{"D":"XDD"}');
});

routesAdmin.route("/api/login").post(async (req, res) => {
  const loginData: LoginRequestBody = req.body;
  res.writeHead(200, {
    "Content-Type": "application/json",
  });
  if (
    loginData.username === process.env.USRNAME &&
    (await decryptPassword(
      loginData.password,
      process.env.PASSWORD || "invalid"
    ))
  ) {
    res.end(
      JSON.stringify({
        res: true,
        token: await createToken(loginData.username, loginData.password),
      })
    );
  } else {
    res.end(JSON.stringify({ res: false }));
  }
});
