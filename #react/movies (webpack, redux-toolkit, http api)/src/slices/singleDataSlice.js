import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import useTMDBService from '../services/TMDBService';

const initialState = {
  singleDataLoadingStatus: "idle",
  singleDataCreditsLoadingStatus: "idle",
  singleDataInfo: null,
  singleDataCredits: [],
};

export const fetchSingleData = createAsyncThunk(
  'singleData/fetchSingleData',
  async (fetchSettings) => {
    const { getSingleData } = useTMDBService();
    return await getSingleData(fetchSettings.dataType, fetchSettings.id);
  }
);

export const fetchSingleDataCredits = createAsyncThunk(
  'singleData/fetchSingleDataCredits',
  async (fetchSettings) => {
    const { getSingleDataCredits } = useTMDBService();
    return await getSingleDataCredits(fetchSettings.dataType, fetchSettings.id);
  }
);

const singleDataSlice = createSlice({
  name: 'singleData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleData.pending, (state) => {
        state.singleDataLoadingStatus = 'loading';
      })
      .addCase(fetchSingleData.fulfilled, (state, action) => {
        state.singleDataLoadingStatus = 'idle';
        state.singleDataInfo = action.payload;
      })
      .addCase(fetchSingleData.rejected, (state) => {
        state.singleDataLoadingStatus = 'error';
      })
      .addCase(fetchSingleDataCredits.pending, (state) => {
        state.singleDataCreditsLoadingStatus = 'loading';
      })
      .addCase(fetchSingleDataCredits.fulfilled, (state, action) => {
        state.singleDataCreditsLoadingStatus = 'idle';
        state.singleDataCredits = action.payload;
      })
      .addCase(fetchSingleDataCredits.rejected, (state) => {
        state.singleDataCreditsLoadingStatus = 'error';
      })
      .addDefaultCase(() => {})
  }
});

const { actions, reducer } = singleDataSlice;
export default reducer;
export const {} = actions;