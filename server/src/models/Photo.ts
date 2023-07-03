export class Photo {
  id: string;
  path: string;
  album: string;
  extencion: string;
  constructor(id: string, path: string, album: string, extencion: string) {
    this.id = id;
    this.path = path;
    this.album = album;
    this.extencion = extencion;
  }
}
