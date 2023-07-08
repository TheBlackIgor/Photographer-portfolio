import "./FolderPagePanel.scss";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { getFolder, getFolders } from "@/api";
import {
  Button,
  FormSection,
  Spacer,
  TextInput,
  UploadContainer,
} from "@/components";
import { HeaderDocumentI } from "@/types";

export const FolderPagePanel = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sections, setSections] = useState<any[]>([]);

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        {sections.map((section, idx) => (
          <FormSection key={idx} />
        ))}
        <Button type="submit">
          <>Update</>
        </Button>
      </div>
      <Spacer />
      <UploadContainer url={params.name || ""} title="Images" />
    </main>
  );
};
