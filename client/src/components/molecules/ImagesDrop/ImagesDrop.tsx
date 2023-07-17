/* eslint-disable jsx-a11y/no-static-element-interactions */
import "./ImagesDrop.scss";

import { useEffect, useRef, useState } from "react";

interface ImagesDropProps {
  onChange: (e: FormData) => void;
}

export const ImagesDrop = ({ onChange }: ImagesDropProps) => {
  const [communicat, setCommunicat] = useState("Drag and drop files");
  const [imagesCount, setImagesCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

    for (let i = 0; i < files.length; i++)
      fd.append("file" + (imagesCount + i + 1), files[i]);

    setImagesCount(imagesCount + files.length);
    onChange(fd);
  };

  const handleOpenFileDialog = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleInputFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const fd = new FormData();

    if (files) {
      for (let i = 0; i < files.length; i++)
        fd.append("file" + (imagesCount + i + 1), files[i]);

      setImagesCount(imagesCount + files.length);
      onChange(fd);
    }
  };

  return (
    <>
      <input
        ref={fileInputRef}
        multiple
        type="file"
        style={{ display: "none" }}
        onChange={e => handleInputFiles(e)}
      />
      <div
        className="images-drop-container"
        onDragLeave={e => handleDragLeave(e)}
        onDragOver={e => handleDragover(e)}
        onDrop={e => handleDragDrop(e)}
        onClick={handleOpenFileDialog}
        onKeyDown={handleOpenFileDialog}
      >
        <p className="images-drop-title">{communicat}</p>
      </div>
    </>
  );
};
