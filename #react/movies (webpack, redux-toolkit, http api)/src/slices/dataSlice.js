import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import useTMDBService from "../services/TMDBService";

const initialState = {
  dataLoadingStatus: "idle",
  dataList: [],
  currentPage: 1,
  totalPages: null,
  dataSearch: null,
}

export const fetchData = createAsyncThunk(
  'data/fetchData',
  async (fetchSettings) => {
    const { getData, getFilteredData, getSearchedData } = useTMDBService();

    switch(fetchSettings.fetchType) {
      case 'defaultData':
        return await getData(fetchSettings.dataType, fetchSettings.currentPage);
      case 'filteredData':
        return await getFilteredData(fetchSettings.dataType, fetchSettings.currentPage, fetchSettings.dataFilters);
      case 'searchedData':
        return await getSearchedData(fetchSettings.dataType, fetchSettings.currentPage, fetchSettings.searchValue);;
      default:
        return [];
    }
  }
);

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    resetData: (state) => {
      state.dataList = [];
      state.currentPage = 1;
      state.totalPages = null;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setDataSearch: (state, action) => {
      state.dataSearch = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.dataLoadingStatus = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.dataLoadingStatus = 'idle';
        state.dataList = action.payload.results;
        state.currentPage = action.payload.page;
        state.totalPages = action.payload.total_pages <= 500 ? action.payload.total_pages : 500;
      })
      .addCase(fetchData.rejected, (state) => {
        state.dataLoadingStatus = 'error';
      })
      .addDefaultCase(() => {});
  }
});

const { actions, reducer } = dataSlice;
export default reducer;
export const { resetData, setCurrentPage, setDataSearch } = actions;