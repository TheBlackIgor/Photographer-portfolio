import axios from "axios";

import { apiUrl } from "@/constant";
import { FolderI, PhotoI, SectionI } from "@/types";

export const createFolder = async (body: unknown) => {
  await axios.post(apiUrl + "/api/folder/create", {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

export const getFolders = async () => {
  let folders: FolderI[] = [];
  await axios
    .post(apiUrl + "/api/folders/get")
    .then(response => {
      // Handle response from the server
      folders = response.data.folders;
    })
    .catch(error => {
      console.error(error);
      // Handle error
    });
  return folders;
};

export const getFolder = async (name: string) => {
  let folders: any[] = [];
  await axios
    .post(apiUrl + "/api/folder/" + name)
    .then(response => {
      // Handle response from the server
      folders = response.data;
    })
    .catch(error => {
      console.error(error);
      // Handle error
    });
  return folders;
};

export const updateIndexDocument = async (
  url: string,
  document: { title: string; description: string; sections: SectionI[] }
) => {
  await axios.patch(apiUrl + "/api/folder/" + url, {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(document),
  });
};

export const deleteFolder = async (id: number, url: string) => {
  let images: PhotoI[] = [];
  await axios
    .delete(apiUrl + "/api/image/" + url + "/" + id)
    .then(response => {
      // Handle response from the server
      images = response.data;
    })
    .catch(error => {
      console.error(error);
      // Handle error
    });
  return images;
};

export const updateFolderImage = async (document: {
  name: string;
  image: string;
}) => {
  await axios.patch(apiUrl + "/api/imageFolder", {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(document),
  });
};
