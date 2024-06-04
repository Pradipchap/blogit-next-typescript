import BlogCardSkeleton from "@/components/skeletons/BlogCardSkeleton";
import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-col gap-5">
      <BlogCardSkeleton />
      <BlogCardSkeleton />
      <BlogCardSkeleton />
      <BlogCardSkeleton />
    </div>
  );
}
