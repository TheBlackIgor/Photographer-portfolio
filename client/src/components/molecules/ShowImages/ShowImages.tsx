/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { ImagePreview } from "@/components";
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
            <ImagePreview
              id={idx.toString()}
              image={image}
              alt={`img${idx}`}
              onDelete={() => onImageClick(idx)}
            />
          ))
        : linkedImages?.map(image => (
            <ImagePreview
              id={image.id}
              image={`${apiUrl}/api/image/${image.album}/${image.id}`}
              alt={`img${image.id}`}
              onDelete={() => onImageClick(Number(image.id))}
            />
          ))}
    </div>
  );
};
