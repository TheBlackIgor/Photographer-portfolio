/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { ImagePreview } from "@/components";
import "./ShowImages.scss";

import { apiUrl } from "@/constant";
import { PhotoI } from "@/types";
import { getImagePath } from "@/utils";

interface ShowImagesI {
  images?: string[];
  linkedImages?: PhotoI[];
  onDelete?: (idx: number) => void;
  onImageClick?: (idx: number) => void;
}

export const ShowImages = ({
  images,
  linkedImages,
  onDelete,
  onImageClick,
}: ShowImagesI) => {
  return (
    <div className="images-container">
      {images
        ? images?.map((image, idx) => (
            <ImagePreview
              key={idx}
              id={idx.toString()}
              image={image}
              alt={`img${idx}`}
              onDelete={onDelete && (() => onDelete(idx))}
              onImageClick={onImageClick && (() => onImageClick(idx))}
            />
          ))
        : linkedImages?.map(image => (
            <ImagePreview
              key={image.id}
              id={image.id}
              image={getImagePath(image, "thumb")}
              alt={`img${image.id}`}
              onDelete={onDelete && (() => onDelete(Number(image.id)))}
              onImageClick={
                onImageClick && (() => onImageClick(Number(image.id)))
              }
            />
          ))}
    </div>
  );
};
