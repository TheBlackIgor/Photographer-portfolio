/* eslint-disable react-hooks/exhaustive-deps */
import "./FolderPagePanel.scss";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { getFolder, getFolders, updateIndexDocument } from "@/api";
import {
  Button,
  FormSection,
  Spacer,
  TextInput,
  UploadContainer,
} from "@/components";
import { HeaderDocumentI, SectionI } from "@/types";

export const FolderPagePanel = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sections, setSections] = useState<SectionI[]>([]);

  const getData = async () => {
    if (params.name) {
      if (!(await getFolders()).includes(params.name))
        navigate("/czadowyPanel/settings");
      const data = await getFolder(params.name);
      console.log(data);
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
        <Button type="add" onClick={handleCreateSection}>
          Create section
        </Button>
        {sections.map((section, idx) => (
          <>
            {idx !== 0 && <Spacer />}
            <FormSection
              key={idx}
              idx={idx}
              data={section}
              update={handleUpdateSection}
              deleteSection={handleDeleteSection}
            />
          </>
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
