import { ShowImages } from "@/components";
import { ModalLayout } from "@/layouts";
import { PhotoI } from "@/types";

interface NewFolderModalProps {
  isVisible: boolean;
  close: () => void;
  uploadedImages: PhotoI[];
}

export const SelectImageModal = ({
  isVisible,
  close,
  uploadedImages,
}: NewFolderModalProps) => {
  const handleSelectImage = async (idx: number) => {
    close();
  };

  return (
    <>
      {isVisible ? (
        <ModalLayout close={close}>
          <div>
            <ShowImages
              linkedImages={uploadedImages}
              onImageClick={handleSelectImage}
            />
          </div>
        </ModalLayout>
      ) : null}
    </>
  );
};
