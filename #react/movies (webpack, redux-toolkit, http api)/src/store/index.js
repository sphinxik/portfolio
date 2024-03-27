import { configureStore } from '@reduxjs/toolkit';
import data from "../slices/dataSlice";
import filters from "../slices/filtersSlice";
import singleData from "../slices/singleDataSlice";
import topRatedSlider from "../slices/topRatedSliderSlice";
import videosSlider from "../slices/videosSliderSlice";
import actorData from "../slices/actorDataSlice";

const stringMiddleware = (store) => (next) => (action) => {
  if (typeof action === 'string') {
    return next({
      type: action
    });
  }
  return next(action);
};

const store = configureStore({
  reducer: {data, filters, singleData, topRatedSlider, videosSlider, actorData},
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
