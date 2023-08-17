import "./ImagePreview.scss";

interface PropsI {
  id: string;
  image: string;
  alt: string;
  onDelete?: (idx: number) => void;
}

export const ImagePreview = ({ id, image, alt, onDelete }: PropsI) => {
  return (
    <div className="image-preview">
      {onDelete && <button onClick={() => onDelete(Number(id))}></button>}
      <img src={image} alt={alt} />
    </div>
  );
};
