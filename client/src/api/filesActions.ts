import axios from "axios";

import { apiUrl } from "@/constant";
import { PhotoI } from "@/types";

export const sendFiles = async (formData: FormData, url: string) => {
  await axios.post(apiUrl + "/api/upload/" + url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getFiles = async (url: string) => {
  let images: PhotoI[] = [];
  await axios
    .post(apiUrl + "/api/get/" + url)
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

export const deleteFile = async (id: number, url: string) => {
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
