"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
export default function Select() {
  const router = useRouter();
  const [feedStatus, setFeedStatus] = useState("foryou");

  useEffect(() => {
    router.push(`?feed=${feedStatus}`);
  }, [feedStatus]);

  return (
    <div className="flex gap-5 relative py-10">
      <button
        className=""
        onClick={() => {
          setFeedStatus("foryou");
        }}
      >
        For you
      </button>
      <button
        className=""
        onClick={() => {
          setFeedStatus("following");
        }}
      >
        Following
      </button>
      <div className={`absolute w-full h-[1px] bg-gray-300 bottom-8 left-0`} />
      <div
        className={`absolute w-14 h-0.5 bg-gray-700 bottom-8 left-0 ${
          feedStatus === "foryou" ? "translate-x-0 " : "translate-x-20"
        } transition-all `}
      />
    </div>
  );
}
