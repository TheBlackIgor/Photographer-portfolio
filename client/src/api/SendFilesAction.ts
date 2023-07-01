import axios from "axios";

import { apiUrl } from "@/constant";

export const sendFiles = (formData: FormData, url: string) => {
  axios
    .post(apiUrl + "/api/upload/" + url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(response => {
      console.log(response.data);
      // Handle response from the server
    })
    .catch(error => {
      console.error(error);
      // Handle error
    });
};
