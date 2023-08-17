import { configureStore } from "@reduxjs/toolkit";

import currentPhotosSlice from "./currentPhotosSlice";

const store = configureStore({
  reducer: {
    currentPhotos: currentPhotosSlice.reducer,
  },
});

export const currentPhotosActions = currentPhotosSlice.actions;

export default store;
