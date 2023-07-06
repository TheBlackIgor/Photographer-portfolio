import "./MainPagePanel.scss";

import { Button, Spacer, UploadContainer } from "@/components";

export const MainPagePanel = () => {
  const handleAddFolder = () => {
    console.log("add");
  };

  return (
    <main className="main-page-main">
      <UploadContainer url="slider" title="Slider images" />
      <Spacer />
      <Button type="add" onClick={handleAddFolder}>
        Add folder
      </Button>
    </main>
  );
};
