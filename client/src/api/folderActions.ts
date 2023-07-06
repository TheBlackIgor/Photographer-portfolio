import axios from "axios";

import { apiUrl } from "@/constant";
import { PhotoI } from "@/types";

export const createFolder = async (body: unknown) => {
  await axios.post(apiUrl + "/api/folder/create", {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

export const getFolders = async () => {
  let images: PhotoI[] = [];
  await axios
    .post(apiUrl + "/api/folder/get")
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
