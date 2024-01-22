export default function BlogCardSkeleton() {
  return (
    <div className="w-full max-w-2xl h-52 grid grid-cols-7 gap-5">
      <div className="h-[70%] m-auto w-full md:col-span-2 bg-slate-200 animate-pulse" />
      <div className="h-full col-span-7 md:col-span-5 flex flex-col justify-between py-5">
        <div className="flex flex-col gap-5">
          {" "}
          <div className="md:text-lg font-bold h-4 w-full bg-slate-200 animate-pulse" />
          <div className="flex flex-col gap-1">
            <div className="text-sm max-w-full h-2 line-clamp-3 bg-slate-200 animate-pulse" />
            <div className="text-sm max-w-full h-2 line-clamp-3 bg-slate-200 animate-pulse" />
            <div className="text-sm max-w-full h-2 line-clamp-3 bg-slate-200 animate-pulse" />
          </div>
        </div>
        <div className="flex justify-start items-center">
          <div className="shrink-0">
            <div>
              <div className="sr-only bg-slate-200 animate-pulse h-2 w-10" />
              <div className="h-10 w-10 rounded-full bg-slate-200 animate-pulse" />
            </div>
          </div>
          <div className="ml-3">
            <p className="h-3 w-24 bg-slate-200 animate-pulse" />
            <div className="flex items-center space-x-1 text-xs">
              <p className="bg-slate-200 animate-pulse w-16 h-2" />
              <span aria-hidden="true">·</span>
              <span className="h-1 w-14 bg-slate-200 animate-pulse "></span>
            </div>
          </div>
          <div className="ml-auto bg-slate-200 animate-pulse px-7 py-3 rounded-md" />
        </div>
      </div>
    </div>
  );
}
