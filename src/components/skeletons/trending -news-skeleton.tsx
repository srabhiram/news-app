export function TrendingNewsSkeleton() {
  return (
    <div className="max-w-full flex md:flex-row flex-col md:flex-wrap md:gap-2">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="bg-white my-1 space-y-2 px-1 md:px-4 py-2 rounded shadow-sm md:w-[18rem] shrink-0 flex flex-col justify-between"
        >
          {/* Image + title skeleton inline (mobile-style) */}
          <div className="max-sm:flex max-sm:shrink-0 max-sm:gap-2 max-sm:w-full items-center">
            {/* Image Skeleton */}
            <div className="w-[150px] md:w-[250px] h-[84px] md:h-[140px] bg-gray-200 rounded animate-pulse" />
            {/* Title Skeleton */}
            <div className="w-full ml-2">
              <div className="h-6 bg-gray-200 rounded mb-2 w-[90%] animate-pulse" />
              <div className="h-5 bg-gray-200 rounded w-[60%] animate-pulse" />
            </div>
          </div>
          {/* Bottom row: district/category & views */}
          <div className="flex items-center gap-1 m-0 place-self-end justify-end">
            <div className="h-5 bg-gray-200 rounded w-[60px] animate-pulse" />
            <div className="h-5 bg-gray-200 rounded w-[25px] animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}
