import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

type TokenState = {
  accessToken: string | null,
  isInitialLoad: boolean
}

const initialState: TokenState = {
  accessToken: null,
  isInitialLoad: true
}

export const tokenSlice = createSlice({
  name: "token",
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


export const { setNewAccessToken, clearToken, setFinishLoading } = tokenSlice.actions;

// Selectors
export const selectAccessToken = (state: RootState) => state.token.accessToken;
export const getLoadState = (state: RootState) => state.token.isInitialLoad;

export default tokenSlice.reducer;