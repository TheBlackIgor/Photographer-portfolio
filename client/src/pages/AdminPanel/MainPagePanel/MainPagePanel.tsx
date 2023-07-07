import "./MainPagePanel.scss";

import { useEffect, useState } from "react";

import { getFolders } from "@/api";
import { FolderIcon } from "@/assets";
import { Button, Card, Spacer, UploadContainer } from "@/components";
import { NewFolderModal } from "@/modals";

export const MainPagePanel = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [folders, setFolders] = useState<string[]>([]);

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
        <div className="main-page-folders">
          {folders.map(folder => (
            <Card key={folder} icon={<FolderIcon />} to={"folders/" + folder}>
              <>{folder}</>
            </Card>
          ))}
        </div>
      </main>
    </>
  );
};
