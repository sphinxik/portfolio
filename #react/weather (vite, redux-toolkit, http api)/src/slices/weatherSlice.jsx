import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from 'react-hot-toast';

import useWeatherService from "../services/weatherService";

import { addDataToLocalStorage } from "../utils";

const initialState = {
  data: [],
};

export const fetchWeather = createAsyncThunk("weather/fetchWeather", async (coord) => {
  const { getCityWeather } = useWeatherService();
  return await getCityWeather(coord);
});

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    removeCity: (state, action) => {
      const newData = state.data.filter(city => city.id !== action.payload);
      state.data = newData;
      addDataToLocalStorage(newData.map(item => ({ id: item.id, coord: item.coord })));
      toast.success('The city was successfully deleted.');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        toast.loading('Loading...');
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        toast.remove();

        if(action.payload) {
          const newData = [...state.data, action.payload];
          state.data = newData;
          addDataToLocalStorage(newData.map(item => ({ id: item.id, coord: item.coord })));
          toast.success('City successfully added.');
        } else {
          toast.error("No data found for this city.");
        }
      })
      .addCase(fetchWeather.rejected, (state) => {
        toast.remove();
        toast.loading("Network error! Please try again later.");
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = weatherSlice;
export default reducer;
export const { removeCity } = actions;
