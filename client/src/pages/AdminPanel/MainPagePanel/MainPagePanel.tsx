import "./MainPagePanel.scss";

import { useEffect, useState } from "react";

import { getFolders } from "@/api";
import { FolderIcon } from "@/assets";
import {
  Button,
  Card,
  Spacer,
  ManageSlider,
  UploadContainer,
} from "@/components";
import { NewFolderModal } from "@/modals";
import { FolderI } from "@/types";

export const MainPagePanel = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [folders, setFolders] = useState<FolderI[]>([]);

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
        {/* <ManageSlider /> // TODO in the future */}
        <Spacer />
        <Button type="add" onClick={handleOpenNewFolderModal}>
          Add folder
        </Button>
        <div className="main-page-folders">
          {folders.map(folder => (
            <Card
              key={folder.name}
              icon={<FolderIcon />}
              to={"folders/" + folder.name}
              folderName={folder.name}
              img={folder.image}
            >
              {folder.name}
            </Card>
          ))}
        </div>
      </main>
    </>
  );
};
