/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import "./ShowImages.scss";

import { apiUrl } from "@/constant";
import { PhotoI } from "@/types";

interface ShowImagesI {
  images?: string[];
  linkedImages?: PhotoI[];
  onImageClick: (idx: number) => void;
}

export const ShowImages = ({
  images,
  linkedImages,
  onImageClick,
}: ShowImagesI) => {
  return (
    <div className="images-container">
      {images
        ? images?.map((image, idx) => (
            <img
              key={idx}
              src={image}
              alt={`img${idx}`}
              onClick={() => onImageClick(idx)}
              onKeyDown={() => onImageClick(idx)}
            />
          ))
        : linkedImages?.map(image => (
            <img
              key={image.id}
              src={`${apiUrl}/api/image/${image.album}/${image.id}`}
              alt={`img${image.id}`}
              onClick={() => onImageClick(Number(image.id))}
              onKeyDown={() => onImageClick(Number(image.id))}
            />
          ))}
    </div>
  );
};
