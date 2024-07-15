export default function SearchResultsSkeleton() {
  return (
    <div className="flex items-center w-full gap-2 h-16 py-2 px-2 cursor-pointer">
      <div className="h-full w-14 bg-gray-100 animate-pulse"></div>
      <div className="flex w-full flex-col gap-1">
        <div className="h-2 bg-gray-100 animate-pulse w-3/4"></div>
        <div className="h-1 bg-gray-100 animate-pulse w-1/2"></div>
      </div>
    </div>
  );
}
