import "./FormSection.scss";

import { useEffect, useRef, useState } from "react";

import { DeleteIcon } from "@/assets";
import { Button } from "@/components";
import { SectionI } from "@/types";
import { SelectImageModal } from "@/modals";

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

  useEffect(() => {
    if (titleRef.current && contentRef.current) {
      titleRef.current.value = data.title;
      contentRef.current.value = data.content;
    }
  }, []);

  const handleUpdate = () => {
    update(idx, {
      title: titleRef.current?.value || "",
      content: contentRef.current?.value || "",
      image: "",
    });
  };

  const handleDelete = () => {
    deleteSection(idx);
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
        <SelectImageModal
          isVisible={showSelectImageModal}
          close={() => setShowSelectImageModal(false)}
          uploadedImages={[]}
        />
      </>

      <div>
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
