import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

type AuthState = {
  accessToken: string | null,
  isInitialLoad: boolean
}

const initialState: AuthState = {
  accessToken: null,
  isInitialLoad: true
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setNewAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    clearToken: (state) => {
      state.accessToken = null;
    },
    setFinishLoading: (state) => {
      state.isInitialLoad = false;
    }
  }
});


export const { setNewAccessToken, clearToken, setFinishLoading } = authSlice.actions;

// Selectors
export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const getLoadState = (state: RootState) => state.auth.isInitialLoad;

export default authSlice.reducer;