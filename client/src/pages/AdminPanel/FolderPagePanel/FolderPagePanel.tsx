/* eslint-disable react-hooks/exhaustive-deps */
import "./FolderPagePanel.scss";

import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import {
  getFolder,
  getFolders,
  updateFolderImage,
  updateIndexDocument,
} from "@/api";
import {
  Button,
  FormSection,
  ImagePreview,
  Spacer,
  TextInput,
  UploadContainer,
} from "@/components";
import { HeaderDocumentI, SectionI } from "@/types";
import { SelectImageModal } from "@/modals";
import { apiUrl } from "@/constant";

export const FolderPagePanel = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sections, setSections] = useState<SectionI[]>([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [showSelectImageModal, setShowSelectImageModal] = useState(false);

  const getData = async () => {
    if (params.name) {
      const folders = await getFolders();
      const thisFolder = folders.find(folder => folder.name === params.name);
      if (!thisFolder) navigate("/czadowyPanel/settings");
      const data = await getFolder(params.name);
      setSelectedImage(thisFolder!.image);
      const header: HeaderDocumentI = data.find(
        document => document.id === "index"
      );

      setTitle(header.title);
      setDescription(header.description);
      setSections(header.sections);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async () => {
    if (params.name)
      await updateIndexDocument(params.name, {
        title,
        description,
        sections,
      });
  };

  const handleCreateSection = () => {
    setSections([...sections, { title: "", content: "", image: "" }]);
  };
  const handleUpdateSection = (idx: number, updatedSection: SectionI) => {
    const tempSections = [...sections];

    tempSections[idx] = updatedSection;

    setSections([...tempSections]);
  };

  const handleDeleteSection = (idx: number) => {
    const tempSections = [...sections];
    tempSections.splice(idx, 1);
    setSections([...tempSections]);
  };

  const handleSelectImage = async (idx: number) => {
    if (params.name)
      await updateFolderImage({ name: params.name, image: idx.toString() });
    setSelectedImage(idx.toString());
  };

  return (
    <main className="folder-page-main">
      <h2>Folder name: {params.name}</h2>

      <div>
        <TextInput
          label="Title"
          name="title"
          type="text"
          value={title}
          setValue={setTitle}
          width="400px"
        />
        <TextInput
          label="Description"
          name="description"
          type="text"
          value={description}
          setValue={setDescription}
          width="400px"
          multiline={true}
        />
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
        <Spacer />
        <Button type="add" onClick={handleCreateSection}>
          Create section
        </Button>
        {sections.map((section, idx) => (
          <Fragment key={idx}>
            {idx !== 0 && <Spacer key={idx} />}
            <FormSection
              idx={idx}
              data={section}
              update={handleUpdateSection}
              deleteSection={handleDeleteSection}
            />
          </Fragment>
        ))}
        <Button type="submit" onClick={handleSubmit}>
          Update
        </Button>
      </div>
      <Spacer />
      <div className="folder-page-uploadContainer">
        <UploadContainer url={params.name || ""} title="Images" />
      </div>
    </main>
  );
};
