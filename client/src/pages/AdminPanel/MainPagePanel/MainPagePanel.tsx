import "./MainPagePanel.scss";

import { useState } from "react";

import { Button, Spacer, UploadContainer } from "@/components";
import { NewFolderModal } from "@/modals";

export const MainPagePanel = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenNewFolderModal = () => setModalVisible(true);
  const handleCloseNewFolderModal = () => setModalVisible(false);

  return (
    <>
      <NewFolderModal
        close={handleCloseNewFolderModal}
        isVisible={modalVisible}
      />
      <main className="main-page-main">
        <UploadContainer url="slider" title="Slider images" />
        <Spacer />
        <Button type="add" onClick={handleOpenNewFolderModal}>
          Add folder
        </Button>
      </main>
    </>
  );
};
