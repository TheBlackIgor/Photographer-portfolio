import "./MainPagePanel.scss";

import { useState } from "react";

import { ImagesDrop, ShowImages } from "@/components";

export const MainPagePanel = () => {
  const [sliderImages, setSliderImages] = useState<FormData>(new FormData());

  const handleDropImages = (formData: FormData) => {
    for (const value of formData.values()) {
      console.log(value);
    }
    setSliderImages(formData);
  };

  return (
    <main className="main-page-main">
      <>
        <h3>Slider images</h3>
        <ImagesDrop onChange={handleDropImages} />
        <ShowImages images={sliderImages} />
      </>
    </main>
  );
};
