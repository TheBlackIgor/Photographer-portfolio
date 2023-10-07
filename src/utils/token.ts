import * as jwt from "jsonwebtoken";
import { IncomingMessage } from "http";
require("dotenv").config();
import { Request } from "express";

export const createToken = async (username: string, password: string) => {
  return await jwt.sign(
    {
      username,
      password,
    },
    process.env.JWT_KEY || "nasjkdfb", // powinno być w .env
    {
      expiresIn: "1d", // "1m", "1d", "24h"
    }
  );
};

type RequestT = Request;

export const verifyHeaderToken = async (request: Request) => {
  try {
    if (
      request.headers.authentication &&
      typeof request.headers.authentication === "string" &&
      request.headers.authentication.startsWith("Bearer")
    ) {
      const token = request.headers.authentication.split(" ")[1];
      const decoded: any = await jwt.verify(
        token,
        process.env.JWT_KEY || "nasjkdfb"
      );
      return (
        decoded.username &&
        decoded.password &&
        new Date(decoded.exp * 1000) > new Date()
      );
    }
  } catch (ex: any) {
    console.log({ message: ex.message });
    return false;
  }
};

export const verifyToken = async (token: string) => {
  try {
    return await jwt.verify(token, process.env.JWT_KEY || "nasjkdfb");
  } catch (ex: any) {
    console.log({ message: ex.message });
  }
};
