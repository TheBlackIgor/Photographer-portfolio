"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const adminPanel_1 = require("./adminPanel");
const photos_1 = require("./photos");
const folders_1 = require("./folders");
const contact_1 = require("./contact");
exports.routes = express_1.default.Router();
exports.routes.get("/api/workingCheck", (req, res) => {
    res.send("API working");
});
exports.routes.use(adminPanel_1.routesAdmin);
exports.routes.use(photos_1.receivePhotos);
exports.routes.use(photos_1.sendPhotos);
exports.routes.use(folders_1.manageFolders);
exports.routes.use(contact_1.contactRoutes);
