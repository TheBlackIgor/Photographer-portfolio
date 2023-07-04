import { useEffect, useState } from "react";

import { deleteFile, getFiles, sendFiles } from "@/api";
import { Button, ImagesDrop, ShowImages } from "@/components";
import { PhotoI } from "@/types";
import { concatenateFormData, removeByIndex } from "@/utils";

interface UploadContainerI {
  url: string;
  title: string;
}

export const UploadContainer = ({ url, title }: UploadContainerI) => {
  const [images, setImages] = useState<string[]>([]);
  const [formData, setFormData] = useState(new FormData());
  const [uploadedImages, setUploadedImages] = useState<PhotoI[]>([]);

  const handleLoadImages = async () => {
    setUploadedImages(await getFiles(url));
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
    await sendFiles(formData, url);
    setUploadedImages(await getFiles(url));
    setFormData(new FormData());
    setImages([]);
  };
  const handleRemoveImageFromServer = async (id: number) => {
    setUploadedImages(await deleteFile(id, url));
  };

  useEffect(() => {
    handleLoadImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h3>{title}</h3>
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
    </>
  );
};
