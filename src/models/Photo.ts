export class Photo {
  id: string;
  path: string;
  album: string;
  extension: string;
  thumbPath: string;
  constructor(
    id: string,
    path: string,
    thumbPath: string,
    album: string,
    extension: string
  ) {
    this.id = id;
    this.path = path;
    this.thumbPath = thumbPath;
    this.album = album;
    this.extension = extension;
  }
}
