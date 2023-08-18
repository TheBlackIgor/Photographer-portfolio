import { ShowImages } from "@/components";
import { ModalLayout } from "@/layouts";
import { StoreI } from "@/store/types";
import { PhotoI } from "@/types";
import { useSelector } from "react-redux";

interface NewFolderModalProps {
  isVisible: boolean;
  close: () => void;
}

export const SelectImageModal = ({ isVisible, close }: NewFolderModalProps) => {
  const handleSelectImage = async (idx: number) => {
    close();
  };

  const images = useSelector((state: StoreI) => state.currentPhotos.photos);
  console.log(images);
  return (
    <>
      {isVisible ? (
        <ModalLayout close={close}>
          <div>
            <ShowImages
              linkedImages={images}
              onImageClick={handleSelectImage}
            />
          </div>
        </ModalLayout>
      ) : null}
    </>
  );
};
