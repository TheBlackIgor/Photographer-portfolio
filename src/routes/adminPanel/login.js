"use strict";
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
exports.routesAdmin = void 0;
const express_1 = require("express");
const utils_1 = require("../../utils");
require("dotenv").config();
exports.routesAdmin = (0, express_1.Router)();
exports.routesAdmin.route("/api/verifyToken").post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ isSuccess: yield (0, utils_1.verifyHeaderToken)(req) }));
}));
exports.routesAdmin.route("/api/login").post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loginData = req.body;
    res.writeHead(200, {
        "Content-Type": "application/json",
    });
    if (loginData.username === process.env.USRNAME &&
        (yield (0, utils_1.decryptPassword)(loginData.password, process.env.PASSWORD || "invalid"))) {
        res.end(JSON.stringify({
            isSuccess: true,
            token: yield (0, utils_1.createToken)(loginData.username, loginData.password),
        }));
    }
    else {
        res.end(JSON.stringify({ isSuccess: false }));
    }
}));
