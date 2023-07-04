/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import "./ShowImages.scss";

import { apiUrl } from "@/constant";
import { PhotoI } from "@/types";

interface ShowImagesI {
  images?: string[];
  linkedImages?: PhotoI[];
  removeImage: (idx: number) => void;
}

export const ShowImages = ({
  images,
  linkedImages,
  removeImage,
}: ShowImagesI) => {
  return (
    <div className="images-container">
      {images
        ? images?.map((image, idx) => (
            <img
              key={idx}
              src={image}
              alt={`img${idx}`}
              onClick={() => removeImage(idx)}
              onKeyDown={() => removeImage(idx)}
            />
          ))
        : linkedImages?.map(image => (
            <img
              key={image.id}
              src={`${apiUrl}/api/image/${image.album}/${image.id}`}
              alt={`img${image.id}`}
              onClick={() => removeImage(Number(image.id))}
              onKeyDown={() => removeImage(Number(image.id))}
            />
          ))}
    </div>
  );
};
