import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/app/store";

const menuSlice = createSlice({
  name: "Menu",
  initialState: { open: false },
  reducers: {
    toggleMenu: (state) => {
      state.open = !state.open;
    },
  },
});

export const { toggleMenu } = menuSlice.actions;
export const MenuState = (state: RootState) => state.Menu;
export default menuSlice.reducer;
