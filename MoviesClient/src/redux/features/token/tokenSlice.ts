import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

type TokenState = {
  value: string
}

const initialState: TokenState = {
  value: ""
}

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setNewAccessToken: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    clearAccessToken: (state) => {
      state.value = "";
    }
  }
});


export const { setNewAccessToken, clearAccessToken } = tokenSlice.actions;

// Selectors
export const selectAccessToken = (state: RootState) => state.token.value;

export default tokenSlice.reducer;