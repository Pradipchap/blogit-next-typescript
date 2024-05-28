import { LoginResult } from "@/types/dataTypes";
import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import getProjectCookieValue from "@/custom_hooks/getCookievalue";
import { BASE_URL } from "@/utils/constants";

export const fetchSessionData = createAsyncThunk("session", async () => {
  console.log("first");
  try {
    const response = await fetch(`${BASE_URL}/api/auth/getSession`);
    if (!response.ok) {
      throw "someting wrong happened";
    }
    console.log(await response.json());
    return response.json();
  } catch (error) {
    return null;
  }
});

const CURRENT_USER_SLICE = createSlice({
  name: "currentUser",
  initialState: <LoginResult>{},
  reducers: {
    updateCurrentUser: (state, action: PayloadAction<LoginResult | null>) => {
      if (action.payload) {
        state.username = action.payload.username;
        state.accessToken = action.payload.accessToken;
        state.email = action.payload.email;
        state.userID = action.payload.userID;
        state.phone = action.payload.userID;
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
        state.userID = action.payload.userID;
        state.phone = action.payload.phone;
        state.image = action.payload.image;
      }
    });
  },
});

export const { updateCurrentUser } = CURRENT_USER_SLICE.actions;
export default CURRENT_USER_SLICE.reducer;
