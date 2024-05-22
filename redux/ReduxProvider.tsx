"use client";

import { store } from "@/app/store";
import React from "react";
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
