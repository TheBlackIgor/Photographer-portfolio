import { DeleteIcon } from "@/assets";
import "./ImagePreview.scss";

interface PropsI {
  id: string;
  image: string;
  alt: string;
  onDelete?: (idx: number) => void;
  onImageClick?: (idx: number) => void;
}

export const ImagePreview = ({
  id,
  image,
  alt,
  onDelete,
  onImageClick,
}: PropsI) => {
  return (
    <div className="image-preview">
      {onDelete && (
        <button onClick={() => onDelete(Number(id))}>
          <DeleteIcon fill="white" />
        </button>
      )}
      <img
        onClick={onImageClick && (() => onImageClick(Number(id)))}
        src={image}
        style={{ cursor: onImageClick ? "pointer" : "default" }}
        alt={alt}
      />
    </div>
  );
};
