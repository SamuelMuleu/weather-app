import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  CurrentWeather,
  Forecast,
  WeatherQuery,
  errorMessage,
  getCurrentWeather,
  getForecast,
} from "@/lib/weatherApi";

interface WeatherState {
  status: "idle" | "loading" | "succeeded" | "failed";
  current: CurrentWeather | null;
  forecast: Forecast | null;
  error: string | null;
}

const initialState: WeatherState = {
  status: "idle",
  current: null,
  forecast: null,
  error: null,
};

export const fetchWeather = createAsyncThunk<
  { current: CurrentWeather; forecast: Forecast },
  WeatherQuery,
  { rejectValue: string }
>("weather/fetch", async (query, { rejectWithValue }) => {
  try {
    if ("lat" in query) {
      const [current, forecast] = await Promise.all([
        getCurrentWeather(query),
        getForecast(query.lat, query.lon),
      ]);
      return { current, forecast };
    }
    const current = await getCurrentWeather(query);
    const forecast = await getForecast(current.lat, current.lon);
    return { current, forecast };
  } catch (error) {
    return rejectWithValue(errorMessage(error));
  }
});

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.current = action.payload.current;
        state.forecast = action.payload.forecast;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        // Ignore requests superseded by a newer search
        if (action.meta.aborted) return;
        state.status = "failed";
        state.error = action.payload ?? "Algo deu errado ao buscar o clima.";
      });
  },
});

export default weatherSlice.reducer;
