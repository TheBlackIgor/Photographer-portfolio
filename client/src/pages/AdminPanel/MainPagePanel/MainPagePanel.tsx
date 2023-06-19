import { ImagesDrop } from "@/components";

export const MainPagePanel = () => {
  const handleDropImages = () => {
    console.log("imagesDropped");
  };

  return (
    <div>
      <ImagesDrop onChange={handleDropImages} />
    </div>
  );
};
