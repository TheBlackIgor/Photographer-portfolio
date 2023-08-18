/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { ImagePreview } from "@/components";
import "./ShowImages.scss";

import { apiUrl } from "@/constant";
import { PhotoI } from "@/types";

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
            />
          ))
        : linkedImages?.map(image => (
            <ImagePreview
              key={image.id}
              id={image.id}
              image={`${apiUrl}/api/image/${image.album}/${image.id}`}
              alt={`img${image.id}`}
              onDelete={onDelete && (() => onDelete(Number(image.id)))}
            />
          ))}
    </div>
  );
};
