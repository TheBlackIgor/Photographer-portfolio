import { createSlice } from "@reduxjs/toolkit";

import { PhotoI } from "@/types";

export interface CurrentPhotosI {
  photos: PhotoI[];
}

const currentPhotosSlice = createSlice({
  name: "currentPhotos",
  initialState: { photos: [] } as CurrentPhotosI,
  reducers: {
    setPhotos(state, action) {
      state.photos = [...action.payload];
    },
  },
});

export const championActions = currentPhotosSlice.actions;

export default currentPhotosSlice;
