import React from "react";

export default function OrDivider({ text = "or" }: { text?: string }) {
  return (
    <div className="inline-flex items-center justify-center w-full my-3">
      <hr className="w-64 h-px bg-gray-200" />
      <span className="px-3 text-lg">{text}</span>
      <hr className="w-64 h-px bg-gray-200" />
    </div>
  );
}
