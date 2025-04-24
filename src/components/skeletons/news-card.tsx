import React from "react";
import { Skeleton } from "../ui/skeleton";
export default function NewsCardSkeleton() {
  return (
    <div>
      <div className="flex items-center mb-1 ">
        <Skeleton className="rounded w-28 h-28 object-contain mr-2 " />
        <div>
          <h2 className="text-sm sm:text-xl font-bold">
            <Skeleton className="w-40 h-4" />
          </h2>

          <p className="text-xs text-gray-600 mt-1">
            •{" "}
            <span>
              <Skeleton className="w-20 h-4" />
            </span>
          </p>
        </div>
      </div>
      <div className="flex items-center mb-1 ">
        <Skeleton className="rounded w-28 h-28 object-contain mr-2 " />
        <div>
          <h2 className="text-sm sm:text-xl font-bold">
            <Skeleton className="w-40 h-4" />
          </h2>

          <p className="text-xs text-gray-600 mt-1">
            •{" "}
            <span>
              <Skeleton className="w-20 h-4" />
            </span>
          </p>
        </div>
      </div>
      <div className="flex items-center mb-1 ">
        <Skeleton className="rounded w-28 h-28 object-contain mr-2 " />
        <div>
          <h2 className="text-sm sm:text-xl font-bold">
            <Skeleton className="w-40 h-4" />
          </h2>

          <p className="text-xs text-gray-600 mt-1">
            •{" "}
            <span>
              <Skeleton className="w-20 h-4" />
            </span>
          </p>
        </div>
      </div>
      <div className="flex items-center mb-1 ">
        <Skeleton className="rounded w-28 h-28 object-contain mr-2 " />
        <div>
          <h2 className="text-sm sm:text-xl font-bold">
            <Skeleton className="w-40 h-4" />
          </h2>

          <p className="text-xs text-gray-600 mt-1">
            •{" "}
            <span>
              <Skeleton className="w-20 h-4" />
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
