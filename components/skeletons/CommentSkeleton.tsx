export default function CommentSkeleton() {
  return (
    <div className="flex flex-col gap-3 min-w-32 px-3 pt-8">
      <div className="flex justify-start items-center font-sans">
        <div className="shrink-0">
          <div className="h-7 w-7 md:h-10 md:w-10 rounded-full bg-gray-100 animate-pulse"></div>
        </div>
        <div className="ml-3 flex-1">
          <div className="h-2 bg-gray-100 rounded w-24 animate-pulse"></div>
          <div className="flex space-x-1 mt-1">
            <div className="h-1 bg-gray-100 rounded w-16 animate-pulse"></div>
            <span className="h-1 w-1 bg-gray-100 rounded-full animate-pulse"></span>
            <div className="h-1 bg-gray-100 rounded w-12 animate-pulse"></div>
          </div>
        </div>
      </div>
      <div className="h-2 bg-gray-100 rounded w-full animate-pulse"></div>
    </div>
  );
}
