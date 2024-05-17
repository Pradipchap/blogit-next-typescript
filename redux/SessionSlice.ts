import { LoginResult } from "@/types/dataTypes";
import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import getProjectCookieValue from "@/custom_hooks/getCookievalue";

export const fetchSessionData = createAsyncThunk(
  "session",
  async () => {
    const loginResult = getProjectCookieValue();
    return loginResult;
  }
);

const CURRENT_USER_SLICE = createSlice({
  name: "currentUser",
  initialState: <LoginResult>{},
  reducers: {
    updateCurrentUser: (state, action: PayloadAction<LoginResult | null>) => {
      if (action.payload) {
        state.username = action.payload.username;
        state.accessToken = action.payload.accessToken;
        state.email = action.payload.email;
        state.id = action.payload.id;
        state.image = action.payload.image;
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchSessionData.fulfilled, (state, action) => {
      if (action.payload) {
        state.accessToken = action.payload.accessToken;
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.id = action.payload.id;
        state.image = action.payload.image;
      }
    });
  },
});

export const { updateCurrentUser } = CURRENT_USER_SLICE.actions;
export default CURRENT_USER_SLICE.reducer;
