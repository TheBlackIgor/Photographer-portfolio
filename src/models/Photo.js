"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Photo = void 0;
class Photo {
    constructor(id, path, thumbPath, album, extencion) {
        this.id = id;
        this.path = path;
        this.thumbPath = thumbPath;
        this.album = album;
        this.extencion = extencion;
    }
}
exports.Photo = Photo;
