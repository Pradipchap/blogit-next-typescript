import { configureStore } from "@reduxjs/toolkit";
import MenuReducer from "@/redux/MenuSlice";
import ToastReducer from "@/redux/ToastSlice";
import SessionReducer from "@/redux/SessionSlice";
export const store = configureStore({
  reducer: {
    Menu: MenuReducer,
    Toast: ToastReducer,
    session: SessionReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
