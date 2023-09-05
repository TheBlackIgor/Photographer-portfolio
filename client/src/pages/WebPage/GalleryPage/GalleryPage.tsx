import "./GalleryPage.scss";

import { useEffect, useState } from "react";

import { getFolders } from "@/api";
import { Card } from "@/components";
import { FolderI } from "@/types";

export const GalleryPage = () => {
  const [folders, setFolders] = useState<FolderI[]>([]);

  useEffect(() => {
    setData();
  }, []);

  const setData = async () => {
    setFolders(await getFolders());
  };

  return (
    <div className="gallery-main">
      {folders.map(folder => (
        <Card
          key={folder.name}
          to={folder.name}
          folderName={folder.name}
          img={folder.image}
        >
          {folder.title}
        </Card>
      ))}
    </div>
  );
};
