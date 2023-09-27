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
exports.sendPhotos = void 0;
const express_1 = require("express");
const db_1 = require("../../db");
const fs = __importStar(require("fs"));
exports.sendPhotos = (0, express_1.Router)();
exports.sendPhotos.post("/api/get/:folder", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const folder = req.params.folder;
    const photos = (_a = (yield (0, db_1.findAll)(folder))) === null || _a === void 0 ? void 0 : _a.filter((document) => document.id !== "index");
    res.send(photos);
}));
exports.sendPhotos.get("/api/image/:folder/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id.split(".")[0];
    const folder = req.params.folder;
    const photo = yield (0, db_1.findOne)({ id: id }, folder);
    if (!photo) {
        res.end();
        return;
    }
    const stat = fs.statSync(photo.path);
    res.writeHead(200, {
        "Content-Type": "image/" + photo.extension,
        "Content-Length": stat.size,
    });
    fs.readFile(photo.path, (err, content) => {
        // Serving the image
        res.end(content);
    });
}));
exports.sendPhotos.get("/api/thumb/:folder/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id.split(".")[0];
    const folder = req.params.folder;
    const photo = yield (0, db_1.findOne)({ id: id }, folder);
    if (!photo) {
        res.end();
        return;
    }
    const stat = fs.statSync(photo.thumbPath);
    res.writeHead(200, {
        "Content-Type": "image/" + photo.extension,
        "Content-Length": stat.size,
    });
    fs.readFile(photo.thumbPath, (err, content) => {
        // Serving the image
        res.end(content);
    });
}));
exports.sendPhotos.delete("/api/image/:folder/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const id = req.params.id;
    const folder = req.params.folder;
    const deletedFile = yield (0, db_1.deleteOne)({ id: id }, folder);
    if (!deletedFile) {
        res.end();
        return;
    }
    fs.unlink(deletedFile.path, (error) => {
        if (error)
            return;
    });
    fs.unlink(deletedFile.thumbPath, (error) => {
        if (error)
            return;
    });
    const photos = (_b = (yield (0, db_1.findAll)(folder))) === null || _b === void 0 ? void 0 : _b.filter((document) => document.id !== "index");
    res.send(photos);
}));
