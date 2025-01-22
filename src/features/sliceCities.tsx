import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface City {
  name: string;
  temp: number;
  temp_min: number;
  temp_max: number;
  feelsLike: number;
  state: string;
  dt: number;
  id: number;
  weather: string;
  lat: number;
  lon: number;
  timezone: number;
  timestamp: number;
}

interface CityState {
  cities: City[];
  error: string;
}

const initialState: CityState = {
  cities: [],
  error: "",
};

const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    setCities(state, action: PayloadAction<City[]>) {
      state.cities = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
});

export const { setCities, setError } = citySlice.actions;

export default citySlice.reducer;
