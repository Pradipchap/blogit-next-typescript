import { CookieInterface } from "@/types/dataTypes";
import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import getProjectCookieValue from "@/custom_hooks/getCookievalue";

export const fetchSessionData = createAsyncThunk("session", async () => {
  try {
    const cookieValue = getProjectCookieValue();
    console.log(cookieValue)
    if (cookieValue === null) {
      throw "";
    }
    console.log(cookieValue)
    return cookieValue;
  } catch (error) {
    return null;
  }
});

const CURRENT_USER_SLICE = createSlice({
  name: "currentUser",
  initialState: <CookieInterface>{},
  reducers: {
    updateCurrentUser: (
      state,
      action: PayloadAction<CookieInterface | null>
    ) => {
      if (action.payload) {
        state.username = action.payload.username;
        state.accessToken = action.payload.accessToken;
        state.email = action.payload.email;
        state.userID = action.payload.userID;
        state.phone = action.payload.userID;
        state.image = action.payload.image;
        state.expiresIn = action.payload.expiresIn;
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
        state.expiresIn = action.payload.expiresIn;
      }
    });
  },
});

export const { updateCurrentUser } = CURRENT_USER_SLICE.actions;
export default CURRENT_USER_SLICE.reducer;
