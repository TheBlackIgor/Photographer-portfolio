import { apiUrl } from "@/constant";
import { PhotoI } from "@/types";

export const getImagePath = (image: PhotoI) => {
  return `${apiUrl}/api/image/${image.album}/${image.id}`;
};
