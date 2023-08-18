import { ShowImages } from "@/components";
import { ModalLayout } from "@/layouts";
import { StoreI } from "@/store/types";
import { useSelector } from "react-redux";

interface NewFolderModalProps {
  isVisible: boolean;
  close: () => void;
}

export const SelectImageModal = ({ isVisible, close }: NewFolderModalProps) => {
  const handleSelectImage = async (idx: number) => {
    console.log(idx);
    close();
  };

  const images = useSelector((state: StoreI) => state.currentPhotos.photos);
  return (
    <>
      {isVisible ? (
        <ModalLayout close={close}>
          <>
            <ShowImages
              linkedImages={images}
              onImageClick={handleSelectImage}
            />
          </>
        </ModalLayout>
      ) : null}
    </>
  );
};
