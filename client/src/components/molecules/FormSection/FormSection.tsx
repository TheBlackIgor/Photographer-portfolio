import "./FormSection.scss";

import { useEffect, useRef, useState } from "react";

import { DeleteIcon } from "@/assets";
import { Button, ImagePreview } from "@/components";
import { SectionI } from "@/types";
import { SelectImageModal } from "@/modals";
import { apiUrl } from "@/constant";
import { useParams } from "react-router";
import { title } from "process";

interface FormSectionI {
  idx: number;
  data: SectionI;
  update: (idx: number, newSection: SectionI) => void;
  deleteSection: (idx: number) => void;
}

export const FormSection = ({
  data,
  idx,
  update,
  deleteSection,
}: FormSectionI) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const [showSelectImageModal, setShowSelectImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [updated, setUpdated] = useState(false);

  const params = useParams();

  useEffect(() => {
    if (titleRef.current && contentRef.current) {
      titleRef.current.value = data.title;
      contentRef.current.value = data.content;
      setSelectedImage(data.image);
    }
    titleRef.current?.addEventListener("input", () => setUpdated(true));
    contentRef.current?.addEventListener("input", () => setUpdated(true));
  }, []);

  const handleUpdate = () => {
    update(idx, {
      title: titleRef.current?.value || "",
      content: contentRef.current?.value || "",
      image: selectedImage,
    });
    setUpdated(false);
  };

  const handleDelete = () => {
    deleteSection(idx);
  };

  const handleSelectImage = (idx: number) => {
    setUpdated(true);
    setSelectedImage(idx.toString());
  };

  return (
    <div className="form-section-main">
      <label htmlFor="title">Title</label>
      <input ref={titleRef} type="text" name="title" />
      <label htmlFor="title">Content</label>
      <textarea ref={contentRef} />
      <>
        <Button type="simple" onClick={() => setShowSelectImageModal(true)}>
          Select photo
        </Button>
        {selectedImage && (
          <ImagePreview
            id={selectedImage}
            alt={"img" + selectedImage}
            image={`${apiUrl}/api/image/${params.name}/${selectedImage}`}
          />
        )}
        <SelectImageModal
          isVisible={showSelectImageModal}
          selectImage={handleSelectImage}
          close={() => setShowSelectImageModal(false)}
        />
      </>

      <div className="flex-align-center">
        {updated && <span style={{ color: "red" }}>Section was changed</span>}
        <Button type="simple" onClick={handleUpdate}>
          Update
        </Button>
        <Button type="simple" onClick={handleDelete}>
          <DeleteIcon />
        </Button>
      </div>
    </div>
  );
};
