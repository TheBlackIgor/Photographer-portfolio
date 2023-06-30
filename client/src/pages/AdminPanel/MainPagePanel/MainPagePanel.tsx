import "./MainPagePanel.scss";

import { useState } from "react";

import { sendFiles } from "@/api";
import { Button, ImagesDrop, ShowImages } from "@/components";
import { concatenateFormData, removeByIndex } from "@/utils";

export const MainPagePanel = () => {
  const [sliderImages, setSliderImages] = useState<string[]>([]);
  const [sliderFormData, setSliderFormData] = useState(new FormData());

  const handleDropImages = (formData: FormData) => {
    const urls: string[] = [];
    for (const value of formData.values()) {
      if (value instanceof Blob) {
        urls.push(URL.createObjectURL(value));
      }
    }
    const newForm = concatenateFormData(sliderFormData, formData);
    setSliderFormData(newForm);
    for (const value of newForm.values()) {
      console.log(value);
    }
    setSliderImages([...sliderImages, ...urls]);
  };

  const handleRemoveSliderImage = (idx: number) => {
    const tempSliderImages = [...sliderImages];
    tempSliderImages.splice(idx, 1);
    setSliderImages(tempSliderImages);

    const newForm = removeByIndex(sliderFormData, idx);
    setSliderFormData(newForm);
  };

  const handleSendImages = () => {
    sendFiles(sliderFormData, "slider");
  };

  return (
    <main className="main-page-main">
      <h3>Slider images</h3>
      <ImagesDrop onChange={handleDropImages} />
      <ShowImages images={sliderImages} removeImage={handleRemoveSliderImage} />
      <Button type="submit" onClick={() => handleSendImages()}>
        Upload
      </Button>
    </main>
  );
};
