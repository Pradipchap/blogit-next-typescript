"use client";

import { useAppSelector } from "@/app/reduxhooks";
import  { useEffect } from "react";
import { createPortal } from "react-dom";
import Icon from "../Icon";
import { useToast } from "@/custom_hooks/useToast";

export default function Toast() {
  const isToastOpen = useAppSelector((state) => state.Toast.isOpen);
  const message = useAppSelector((state) => state.Toast.message);
  const toastType = useAppSelector((state) => state.Toast.type);
  const { closeToast } = useToast();

  useEffect(() => {
    if (isToastOpen && toastType !== "loading") {
      setTimeout(() => {
        closeToast();
      }, 5000);
    }
    return () => {};
    
  },
  //eslint-disable-next-line react-hooks/exhaustive-deps
   [isToastOpen, toastType]);

  const style = () => {
    switch (toastType) {
      case "error":
        return " bg-gradient-to-r from-red-50 via-red-100 to-red-200 border-red-600";
      case "info":
        return " bg-gradient-to-l from-blue-50 via-blue-100 to-blue-200 border-blue-700";
      case "success":
        return " bg-gradient-to-l from-green-50 via-green-100 to-green-200 border-green-600";
      case "loading":
        return "bg-gradient-to-l from-yellow-50 via-yellow-100 to-yellow-200 border-yellow-600";
    }
  };
  return (
    isToastOpen &&
    createPortal(
      <div
        className={`absolute py-5 text-sm top-20 right-10 z-[90] border-l-8 w-max min-w-[176px] h-14 flex justify-around gap-2 px-1 items-center rounded-md shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] ${style()}`}
      >
        <Icon
          {...(toastType === "success"
            ? { name: "Check", className: "text-green-600 text-base" }
            : toastType === "error"
            ? { name: "Close", className: "text-red-600 text-base" }
            : toastType === "info"
            ? { name: "Exclamation", className: "text-blue-600 text-base" }
            : {
                name: "Loading",
                className: "text-black animate-spin text-sm",
              })}
        />
        <p className="w-[90%]">{message}</p>
      </div>,
      document.body
    )
  );
}
