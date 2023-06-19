import { apiUrl } from "@/constant";

export const verifyToken = async (token: string) => {
  const res = await fetch(apiUrl + "/api/verifyToken", {
    method: "POST",
    headers: { Authentication: "Bearer " + token },
  }).then(data => data.json());
  if (res.isSuccess) {
    return true;
  } else {
    return false;
  }
};
