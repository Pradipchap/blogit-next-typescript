import BlogCardSkeleton from "@/components/skeletons/BlogCardSkeleton";

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
