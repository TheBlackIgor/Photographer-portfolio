import { useEffect, useState } from "react";

import { deleteFile, getFiles, sendFiles } from "@/api";
import { Button, ImagesDrop, ShowImages } from "@/components";
import { concatenateFormData, removeByIndex } from "@/utils";
import { useDispatch, useSelector } from "react-redux";
import { StoreI } from "@/store/types";
import { currentPhotosActions } from "@/store";

interface UploadContainerI {
  url: string;
  title: string;
}

export const UploadContainer = ({ url, title }: UploadContainerI) => {
  const dispatch = useDispatch();
  const [images, setImages] = useState<string[]>([]);
  const [formData, setFormData] = useState(new FormData());

  const uploadedImages = useSelector(
    (state: StoreI) => state.currentPhotos.photos
  );

  const handleLoadImages = async () => {
    dispatch(currentPhotosActions.setPhotos(await getFiles(url)));
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
    const tempImages = [...images];
    tempImages.splice(idx, 1);
    setImages(tempImages);

    const newForm = removeByIndex(formData, idx);
    setFormData(newForm);
  };

  const handleSendImages = async () => {
    await sendFiles(formData, url);
    setFormData(new FormData());
    setImages([]);
    setTimeout(
      async () => dispatch(currentPhotosActions.setPhotos(await getFiles(url))),
      1000
    );
  };
  const handleRemoveImageFromServer = async (id: number) => {
    dispatch(currentPhotosActions.setPhotos(await deleteFile(id, url)));
  };

  useEffect(() => {
    handleLoadImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log(uploadedImages);
  return (
    <>
      <h3>{title}</h3>
      <ImagesDrop onChange={handleDropImages} />
      <ShowImages images={images} onDelete={handleRemoveLocalImage} />
      <Button type="submit" onClick={() => handleSendImages()}>
        Upload
      </Button>
      <ShowImages
        linkedImages={uploadedImages}
        onDelete={handleRemoveImageFromServer}
      />
    </>
  );
};
