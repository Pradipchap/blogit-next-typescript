export default function BlogCardSkeleton() {
  return (
    <div className="space-y-4 lg:grid lg:grid-cols-3 lg:items-start lg:gap-6 lg:space-y-0 m-5 w-full animate-pulse">
      <div className="group">
        <div className="aspect-w-3 aspect-h-2">
          <div className="object-cover shadow-lg rounded-lg group-hover:opacity-75 max-md:hidden w-[200px] h-[150px] bg-slate-300" />
        </div>
      </div>

      <div className="sm:col-span-2 cursor-pointer">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center leading-none px-2.5 py-1.5 text-sm font-medium text-skin-inverted rounded-full border border-skin-input">
              <svg
                className="mr-1.5 h-3 w-2 brand-tutoriel"
                fill=" bg-slate-300"
                viewBox="0 0 8 8"
              >
                <circle cx="4" cy="4" r="3"></circle>
              </svg>
            </span>
          </div>
        </div>

        <div className="mt-2">
          <div className="group">
            <h4 className="text-lg leading-6 font-semibold font-sans text-skin-inverted group-hover:text-skin-primary bg-slate-300 w-[40%] h-4"></h4>
          </div>

          <p className="mt-1 text-sm font-normal text-skin-base leading-5 w-[60%] h-3 bg-slate-300"></p>

          <div className="mt-3 flex items-center font-sans">
            <div className="shrink-0">
              <div>
                <span className="sr-only h-2 w-[30%] bg-slate-300"></span>

                <div
                  className="h-10 w-10 rounded-full bg-slate-300"
                />
              </div>
            </div>

            <div className="ml-3 w-full bg--500 flex gap-2 flex-col">
              <div className="text-sm font-medium text-skin-inverted">
                <p className="hover:underline w-[30%] h-3 bg-slate-300"></p>
              </div>

              <div className="flex space-x-1 text-sm text-skin-muted">
                <p className="w-[20%] h-2 bg-slate-300"></p>

                <span aria-hidden="true">·</span>

                <span className="w-[50%] h-2 bg-slate-300"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
