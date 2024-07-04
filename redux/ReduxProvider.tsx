"use client";

import { store } from "@/app/store";

import { Provider } from "react-redux";
import { fetchSessionData } from "./SessionSlice";
store.dispatch(fetchSessionData());
export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}
