import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import useTMDBService from "../services/TMDBService";

const initialState = {
  dataFilters: null,
  sortDataOptions: [
    { value: "", label: "Unsorted", isDisabled: true },
    { value: "vote_average.desc", label: "Rating desc" },
    { value: "vote_average.asc", label: "Rating asc" },
    // { value: "release_date.desc", label: "Release date desc" },
    // { value: "release_date.asc", label: "Release date asc" },
    // { value: "original_title.asc", label: "Title (A-Z)" },
    // { value: "original_title.desc", label: "Title (Z-A)" },
  ],
  genresLoadingStatus: "idle",
  dataGenres: [],
  activeDataGenres: ""
};

export const fetchDataGenres = createAsyncThunk(
  'filters/fetchDataGenres',
  async (dataType) => {
    const { getDataGenres } = useTMDBService();
    const data = await getDataGenres(dataType);
    return data.genres;
  }
);

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setDataFilters: (state, action) => {
      state.dataFilters = action.payload;
    },
    setActiveDataGenres: (state, action) => {
      state.activeDataGenres = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataGenres.pending, (state) => {
        state.genresLoadingStatus = 'loading';
      })
      .addCase(fetchDataGenres.fulfilled, (state, action) => {
        state.genresLoadingStatus = 'idle';
        state.dataGenres = action.payload;
      })
      .addCase(fetchDataGenres.rejected, (state) => {
        state.genresLoadingStatus = 'error';
      })
      .addDefaultCase(() => {})
  }
});

const { actions, reducer } = filtersSlice;
export default reducer;
export const { setDataFilters, setActiveDataGenres } = actions;