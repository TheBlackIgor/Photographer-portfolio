import "./MainPagePanel.scss";

import { useEffect, useState } from "react";

import { getFiles, sendFiles } from "@/api";
import { Button, ImagesDrop, ShowImages } from "@/components";
import { PhotoI } from "@/types";
import { concatenateFormData, removeByIndex } from "@/utils";

export const MainPagePanel = () => {
  const [images, setImages] = useState<string[]>([]);
  const [formData, setFormData] = useState(new FormData());
  const [uploadedImages, setUploadedImages] = useState<PhotoI[]>([]);

  useEffect(() => {
    handleLoadImages();
  }, []);

  const handleLoadImages = async () => {
    setUploadedImages(await getFiles("slider"));
  };

  const handleDropImages = (form: FormData) => {
    const urls: string[] = [];
    for (const value of form.values()) {
      if (value instanceof Blob) {
        urls.push(URL.createObjectURL(value));
      }
    }
    setFormData(concatenateFormData(formData, form));
    setImages([...images, ...urls]);
  };

  const handleRemoveLocalImage = (idx: number) => {
    const tempSliderImages = [...images];
    tempSliderImages.splice(idx, 1);
    setImages(tempSliderImages);

    const newForm = removeByIndex(formData, idx);
    setFormData(newForm);
  };

  const handleSendImages = async () => {
    await sendFiles(formData, "slider");
    setUploadedImages(await getFiles("slider"));
    setFormData(new FormData());
    setImages([]);
  };
  const handleRemoveImageFromServer = (id: number) => {
    console.log(id);
  };

  return (
    <main className="main-page-main">
      <h3>Slider images</h3>

      <div>
        <ImagesDrop onChange={handleDropImages} />
        <ShowImages images={images} removeImage={handleRemoveLocalImage} />

        <Button type="submit" onClick={() => handleSendImages()}>
          Upload
        </Button>
      </div>
      <div>
        <ShowImages
          linkedImages={uploadedImages}
          removeImage={handleRemoveImageFromServer}
        />
      </div>
    </main>
  );
};
