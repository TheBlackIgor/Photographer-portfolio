import "./ImagesDrop.scss";

import { useEffect, useState } from "react";

interface ImagesDropProps {
  onChange: (e: FormData) => void;
}

export const ImagesDrop = ({ onChange }: ImagesDropProps) => {
  const [communicat, setCommunicat] = useState("Drag and drop files");

  useEffect(() => {
    window.ondragover = function (e) {
      setCommunicat("Drop here");
      e.preventDefault(); // usuwa domyślne zachowanie strony po wykonaniu zdarzenia, warto zakomentować i sprawdzić
      e.stopPropagation(); // zatrzymuje dalszą propagację zdarzenia, warto zakomentować i sprawdzić
    };
  }, []);

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    setCommunicat("Drop here");
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragover = (e: React.DragEvent<HTMLDivElement>) => {
    setCommunicat("Drop them");
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragDrop = (e: React.DragEvent<HTMLDivElement>) => {
    setCommunicat("Drag and drop files");
    e.stopPropagation();
    e.preventDefault();

    const files = e.dataTransfer.files;
    const fd = new FormData();

    for (let i = 0; i < files.length; i++) fd.append("file", files[i]);

    onChange(fd);
  };

  return (
    <div
      className="images-drop-container"
      onDragLeave={e => handleDragLeave(e)}
      onDragOver={e => handleDragover(e)}
      onDrop={e => handleDragDrop(e)}
    >
      <p className="images-drop-title">{communicat}</p>
    </div>
  );
};
