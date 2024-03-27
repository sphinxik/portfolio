import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import useTMDBService from "../services/TMDBService"; 

const initialState = {
  actorInfoLoadingStatus: 'idle',
  actorInfo: null,
  actorFilmographyLoadingStatus: 'idle',
  actorFilmography: []
};

export const fetchActorInfo = createAsyncThunk(
  'actorData/fetchActorInfo',
  async (id) => {
    const { getActorData } = useTMDBService();
    return await getActorData(id);
  }
);

export const fetchActorFilmography = createAsyncThunk(
  'actorData/fetchActorFilmography',
  async (id) => {
    const { getActorFilmography } = useTMDBService();
    return await getActorFilmography(id);
  }
);

const actorDataSlice = createSlice({
  name: 'actorData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchActorInfo.pending, (state) => {
        state.actorInfoLoadingStatus = 'loading';
      })
      .addCase(fetchActorInfo.fulfilled, (state, action) => {
        state.actorInfoLoadingStatus = 'idle';
        state.actorInfo = action.payload;
      })
      .addCase(fetchActorInfo.rejected, (state) => {
        state.actorInfoLoadingStatus = 'error'
      })
      .addCase(fetchActorFilmography.pending, (state) => {
        state.actorFilmographyLoadingStatus = 'loading';
      })
      .addCase(fetchActorFilmography.fulfilled, (state, action) => {
        state.actorFilmographyLoadingStatus = 'idle';
        state.actorFilmography = action.payload;
      })
      .addCase(fetchActorFilmography.rejected, (state) => {
        state.actorFilmographyLoadingStatus = 'error'
      })
      .addDefaultCase(() => {});
  }
});

const { actions, reducer } = actorDataSlice;
export default reducer;
export const {} = actions;