import axios from "axios";

import { apiUrl } from "@/constant";

interface EmailI {
  email: string;
  content: string;
}

export const sendEmail = async (body: EmailI) => {
  const res = await axios
    .post(apiUrl + "/api/contact", { body })
    .then(response => response.data);
  return res.message;
};
