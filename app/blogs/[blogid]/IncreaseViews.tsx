"use client";

import { BASE_URL } from "@/utils/constants";
import { useEffect } from "react";
interface props {
  blogid: string;
}
export default function IncreaseViews({ blogid }: props) {
  useEffect(
    () => {
      async function increaseViews() {
        try {
          await fetch(`${BASE_URL}/api/blogs/increaseViews`, {
            method: "POST",
            body: JSON.stringify({ blogid }),
          });
        } catch (error) {}
      }
      increaseViews();
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return null;
}
