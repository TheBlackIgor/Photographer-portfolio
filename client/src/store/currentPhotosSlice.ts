import { createSlice } from "@reduxjs/toolkit";

import { PhotoI } from "@/types";

interface InitialState {
  photos: PhotoI[];
}

const currentPhotosSlice = createSlice({
  name: "champions",
  initialState: { photos: [] } as InitialState,
  reducers: {
    setPhotos(state, action) {
      state.photos = [...action.payload.photos];
    },
  },
});

export const championActions = currentPhotosSlice.actions;

export default currentPhotosSlice;
