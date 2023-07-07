import "./MainPagePanel.scss";

import { useEffect, useState } from "react";

import { getFolders } from "@/api";
import { Button, Spacer, UploadContainer } from "@/components";
import { NewFolderModal } from "@/modals";

export const MainPagePanel = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [folders, setFolders] = useState<string[]>([]);

  console.log(folders);

  useEffect(() => {
    setData();
  }, [modalVisible]);

  const setData = async () => {
    setFolders(await getFolders());
  };

  const handleOpenNewFolderModal = () => setModalVisible(true);
  const handleCloseNewFolderModal = async () => {
    setModalVisible(false);
  };

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
