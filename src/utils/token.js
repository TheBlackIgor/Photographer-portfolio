"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.verifyHeaderToken = exports.createToken = void 0;
const jwt = __importStar(require("jsonwebtoken"));
require("dotenv").config();
const createToken = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    return yield jwt.sign({
        username,
        password,
    }, process.env.JWT_KEY || "nasjkdfb", // powinno być w .env
    {
        expiresIn: "1d", // "1m", "1d", "24h"
    });
});
exports.createToken = createToken;
const verifyHeaderToken = (request) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (request.headers.authentication &&
            typeof request.headers.authentication === "string" &&
            request.headers.authentication.startsWith("Bearer")) {
            const token = request.headers.authentication.split(" ")[1];
            const decoded = yield jwt.verify(token, process.env.JWT_KEY || "nasjkdfb");
            return (decoded.username &&
                decoded.password &&
                new Date(decoded.exp * 1000) > new Date());
        }
    }
    catch (ex) {
        console.log({ message: ex.message });
        return false;
    }
});
exports.verifyHeaderToken = verifyHeaderToken;
const verifyToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield jwt.verify(token, process.env.JWT_KEY || "nasjkdfb");
    }
    catch (ex) {
        console.log({ message: ex.message });
    }
});
exports.verifyToken = verifyToken;
