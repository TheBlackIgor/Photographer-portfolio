import { apiUrl } from "@/constant";
import { PhotoI } from "@/types";

export const getImagePath = (
  image: PhotoI,
  type: "thumb" | "fullsize" = "fullsize"
) => {
  if (type === "thumb")
    return `${apiUrl}/api/thumb/${image.album}/${image.id}.jpg`;
  else if (type === "fullsize")
    return `${apiUrl}/api/image/${image.album}/${image.id}.jpg`;
  return "";
};
