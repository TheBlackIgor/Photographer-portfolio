import { useState } from "react";

import { createFolder } from "@/api";
import { Button, TextInput } from "@/components";
import { ModalLayout } from "@/layouts";

interface NewFolderModalProps {
  isVisible: boolean;
  close: () => void;
}

export const NewFolderModal = ({ isVisible, close }: NewFolderModalProps) => {
  const [newFolderName, setNewFolderName] = useState("");
  const [title, setTitle] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createFolder({ name: newFolderName, title });
    setNewFolderName("");
    setTitle("");
    close();
  };

  return (
    <>
      {isVisible ? (
        <ModalLayout close={close}>
          <form
            method={"POST"}
            action="/czadowyPanel/login"
            className="panel-login-form"
            onSubmit={e => handleSubmit(e)}
          >
            <TextInput
              label="New folder name"
              name="newFolderName"
              value={newFolderName}
              setValue={setNewFolderName}
              required={true}
            />
            <TextInput
              label="Title"
              name="title"
              value={title}
              setValue={setTitle}
              required={true}
            />
            <div>
              <Button type="submit">Create folder</Button>
            </div>
          </form>
        </ModalLayout>
      ) : null}
    </>
  );
};
