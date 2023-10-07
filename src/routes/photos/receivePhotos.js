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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.receivePhotos = void 0;
const express_1 = require("express");
const formidable_1 = __importDefault(require("formidable"));
const fs = __importStar(require("fs"));
const models_1 = require("../../models");
const db_1 = require("../../db");
const sharp_1 = __importDefault(require("sharp"));
const UPLOAD_PATH = "./src/uploads";
exports.receivePhotos = (0, express_1.Router)();
exports.receivePhotos.post("/api/upload/:folder", (req, res) => {
    const form = (0, formidable_1.default)({ multiples: true, keepExtensions: true });
    const response = [];
    const folder = req.params.folder;
    form.parse(req, (err, fields, files) => __awaiter(void 0, void 0, void 0, function* () {
        const keys = Object.keys(files);
        if (keys.length > 0) {
            const promises = keys.map((key, idx) => __awaiter(void 0, void 0, void 0, function* () {
                return createImage(files[key], folder, idx);
            }));
            try {
                const images = yield Promise.all(promises);
                response.push(...images);
            }
            catch (error) {
                console.error(error);
                res.status(500).send("Internal Server Error");
                return;
            }
        }
        (0, db_1.insertArray)(response, folder);
        res.end(JSON.stringify(response));
    }));
});
const createImage = (file, album, idx) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(UPLOAD_PATH + "/" + album))
            fs.mkdirSync(UPLOAD_PATH + "/" + album, { recursive: true });
        try {
            let splitedFilePath = [];
            if (file[0].filepath.includes("/"))
                splitedFilePath = file[0].filepath.split("/");
            else
                splitedFilePath = file[0].filepath.split("\\");
            const newFileName = splitedFilePath[splitedFilePath.length - 1];
            const thumbNewPath = `${UPLOAD_PATH}/${album}/thumb-${newFileName}`;
            const newPath = `${UPLOAD_PATH}/${album}/${newFileName}`;
            (0, sharp_1.default)(file[0].filepath).resize(1000).toFile(thumbNewPath);
            const extension = newFileName.split(".")[1];
            fs.writeFile(newPath, fs.readFileSync(file[0].filepath), function (err) {
                if (err) {
                    return console.log(err);
                }
                resolve(new models_1.Photo((new Date().getTime() + idx * 11).toString(), newPath, thumbNewPath, album, extension));
            });
        }
        catch (error) {
            console.log(error);
            reject("formidable parse error");
        }
    });
});
