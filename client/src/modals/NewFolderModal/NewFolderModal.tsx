import { ModalLayout } from "@/layouts";

interface NewFolderModalProps {
  isVisible: boolean;
  close: () => void;
}

export const NewFolderModal = ({ isVisible, close }: NewFolderModalProps) => {
  return (
    <>
      {isVisible ? (
        <ModalLayout close={close}>
          <>NewFolderModal</>
        </ModalLayout>
      ) : null}
    </>
  );
};
