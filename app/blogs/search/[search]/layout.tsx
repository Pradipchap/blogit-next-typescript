import React, { ReactNode } from "react";

export default function layout({
  children,
  params,
}: {
  children: ReactNode;
  params: { search: string };
}) {
  return (
    <div className="flex flex-col mt-10 px-5 gap-10">
      <p className="text-4xl text-gray-400 font-bold">
        Search Results for{" "}
        <span className="text-black">{decodeURIComponent(params.search)}</span>
      </p>
      {children}
    </div>
  );
}
