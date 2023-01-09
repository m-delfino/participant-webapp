import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  preferences: {
    1: false,
    2: false,
    3: false,
    4: false
  },
};

export type CookiePreferences = typeof initialState.preferences;

export const cookiePreferenceSlice = createSlice({
  name: 'cookie',
  initialState: initialState,
  reducers: {
    preferencesChanged: (state, action: PayloadAction<typeof initialState.preferences>) => {
      state.preferences = action.payload
    }
  }
});
