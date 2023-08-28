import React, { useEffect, useState } from "react";
import "./GalleryPage.scss";
import { FolderI } from "@/types";
import { getFolders } from "@/api";
import { Card } from "@/components";

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
