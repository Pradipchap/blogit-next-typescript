import React from "react";

export default function TopicBlogSkeleton() {
  return (
    <div className="w-full max-w-[35rem] h-[33rem] flex flex-col p-1 gap-2">
      <div className="h-72 w-full bg-slate-100 animate-pulse"></div>
      <div className="flex items-center mt-4 w-full gap-3 mb-2">
        <div className="h-6 w-6 rounded-full bg-slate-100 animate-pulse"></div>
        <div className="h-4 w-20 bg-slate-100 animate-pulse"></div>
        <div className="mx-auto mr-0 h-6 w-16 bg-slate-100 rounded-full animate-pulse"></div>
      </div>
      <div className="h-8 w-full bg-slate-100 animate-pulse"></div>
      <div className="h-4 w-full bg-slate-100 mt-2 animate-pulse"></div>
      <div className="flex space-x-1 text-xs mt-1 items-center gap-2">
        <div className="h-4 w-24 bg-slate-100 animate-pulse"></div>
        <div className="h-4 w-8 bg-slate-100 animate-pulse"></div>
        <div className="flex gap-1 items-center h-full justify-center">
          <div className="h-6 w-6 bg-slate-100 animate-pulse"></div>
          <div className="h-4 w-8 bg-slate-100 animate-pulse"></div>
        </div>
        <div className="flex gap-1 items-center h-full justify-center">
          <div className="h-6 w-6 bg-slate-100 animate-pulse"></div>
          <div className="h-4 w-8 bg-slate-100 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
