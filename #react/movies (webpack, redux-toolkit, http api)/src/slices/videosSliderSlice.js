import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import useTMDBService from "../services/TMDBService"; 

const initialState = {
  dataLoadingStatus: "idle",
  data: []
};

export const fetchVideosSliderData = createAsyncThunk(
  'videosSlider/fetchVideosSliderData',
  async ({dataType, id}) => {
    const { getSingleDataVideos } = useTMDBService();
    return await getSingleDataVideos(dataType, id);
  }
);

const videosSliderSlice = createSlice({
  name: 'videosSlider',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideosSliderData.pending, (state) => {
        state.dataLoadingStatus = 'loading';
      })
      .addCase(fetchVideosSliderData.fulfilled, (state, action) => {
        state.dataLoadingStatus = 'idle';
        state.data = action.payload;
      })
      .addCase(fetchVideosSliderData.rejected, (state) => {
        state.dataLoadingStatus = 'error';
      })
      .addDefaultCase(() => {})
  }
});

const { actions, reducer } = videosSliderSlice;
export default reducer;
export const {} = actions;