import { Router } from "express";
import { decryptPassword, createToken, verifyHeaderToken } from "../../utils";
require("dotenv").config();
import { LoginRequestBody } from "./types";

export const routesAdmin = Router();

routesAdmin.route("/api/verifyToken").post(async (req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ isSuccess: await verifyHeaderToken(req) }));
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
        isSuccess: true,
        token: await createToken(loginData.username, loginData.password),
      })
    );
  } else {
    res.end(JSON.stringify({ isSuccess: false }));
  }
});
