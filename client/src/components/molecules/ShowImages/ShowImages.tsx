import "./ShowImages.scss";

import { useEffect } from "react";

interface ShowImagesI {
  images: string[];
  removeImage: (idx: number) => void;
}

export const ShowImages = ({ images, removeImage }: ShowImagesI) => {
  useEffect(() => {
    // console.log(images);
  }, [images]);

  return (
    <div className="images-container">
      {images.map((image, idx) => (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        <img
          key={idx}
          src={image}
          alt={`img${idx}`}
          onClick={() => removeImage(idx)}
          onKeyDown={() => removeImage(idx)}
        />
      ))}
    </div>
  );
};
