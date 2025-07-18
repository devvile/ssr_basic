import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
  CurrentWeather,
  ComparisonCity,
  WeatherData,
  ForecastData,
} from "@/types/weather";
import { DEFAULT_COMPARISON_CITIES } from "@/const/config";

export interface WeatherState {
  // Weather data (updated by TanStack Query)
  currentWeather: CurrentWeather | null;
  forecast: ForecastData[];
  comparisonWeather: ComparisonCity[];

  // UI state
  comparisonCities: string[];
  selectedCity: string | null;

  // Loading states (synced from TanStack Query)
  isLoading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  currentWeather: null,
  forecast: [], 
  comparisonWeather: [],
  comparisonCities: DEFAULT_COMPARISON_CITIES,
  selectedCity: null,
  isLoading: false,
  error: null,
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setWeatherData: (state, action: PayloadAction<WeatherData>) => {
      state.currentWeather = action.payload.current;
      state.forecast = action.payload.forecast; 
      state.comparisonWeather = action.payload.comparison;
      state.error = null;
    },

    setCurrentWeather: (state, action: PayloadAction<CurrentWeather>) => {
      state.currentWeather = action.payload;
    },

    // Added this new action
    setForecastData: (state, action: PayloadAction<ForecastData[]>) => {
      state.forecast = action.payload;
    },

    setComparisonWeatherData: (
      state,
      action: PayloadAction<ComparisonCity[]>
    ) => {
      state.comparisonWeather = action.payload;
    },

    setWeatherLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setWeatherError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    clearWeatherError: (state) => {
      state.error = null;
    },

    setComparisonCities: (state, action: PayloadAction<string[]>) => {
      state.comparisonCities = action.payload;
    },
    setSelectedCity: (state, action: PayloadAction<string | null>) => {
      state.selectedCity = action.payload;
    },

    // Reset actions
    resetWeatherData: (state) => {
      state.currentWeather = null;
      state.forecast = [];
      state.comparisonWeather = [];
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  setWeatherData,
  setCurrentWeather,
  setForecastData, 
  setComparisonWeatherData,
  setWeatherLoading,
  setWeatherError,
  clearWeatherError,
  setComparisonCities,
  setSelectedCity,
  resetWeatherData,
} = weatherSlice.actions;

export default weatherSlice.reducer;