export class Photo {
  id: string;
  path: string;
  album: string;
  constructor(id: string, path: string, album: string) {
    this.id = id;
    this.path = path;
    this.album = album;
  }
}
