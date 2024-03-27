import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import useTMDBService from '../services/TMDBService';

const initialState = {
  dataLoadingStatus: "idle",
  data: {
    movie: [],
    tv: [],
  }
};

export const fetchTopRatedData = createAsyncThunk(
  'topRatedSlider/fetchTopRatedData',
  async (dataType) => {
    const { getTopRatedData } = useTMDBService();
    const data = await getTopRatedData(dataType);
    return {dataType, data};
  }
);

const topRatedSliderSlice = createSlice({
  name: 'topRatedSlider',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopRatedData.pending, (state) => {
        state.dataLoadingStatus = 'loading';
      })
      .addCase(fetchTopRatedData.fulfilled, (state, action) => {
        state.dataLoadingStatus = 'idle';
        state.data[action.payload.dataType] = action.payload.data;
      })
      .addCase(fetchTopRatedData.rejected, (state) => {
        state.dataLoadingStatus = 'error';
      })
      .addDefaultCase(() => {})
  }
});

const { actions, reducer } = topRatedSliderSlice;
export default reducer;
export const {} = actions;