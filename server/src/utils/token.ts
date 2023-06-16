import * as jwt from "jsonwebtoken";
import { IncomingMessage } from "http";
require("dotenv").config();

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

export const verifyHeaderToken = async (request: IncomingMessage) => {
  try {
    if (
      request.headers.authorization &&
      request.headers.authorization.startsWith("Bearer")
    ) {
      const token = request.headers.authorization.split(" ")[1];
      const decoded: any = await jwt.verify(
        token,
        process.env.JWT_KEY || "nasjkdfb"
      );
      if (
        decoded.username &&
        decoded.password &&
        new Date(decoded.exp * 1000) > new Date()
      )
        return true;
      else return false;
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
