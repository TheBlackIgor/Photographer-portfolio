import "./MainPagePanel.scss";

import { Button, UploadContainer } from "@/components";

export const MainPagePanel = () => {
  const handleAddFolder = () => {
    console.log("add");
  };

  return (
    <main className="main-page-main">
      <UploadContainer url="slider" title="Slider images" />
      <Button type="add" onClick={handleAddFolder}>
        Add folder
      </Button>
    </main>
  );
};
