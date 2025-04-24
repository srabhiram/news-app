import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function SingleNewsCardSkeleton() {
  return (
    <div>
      <div className="flex flex-col items-center mx-0.5 ">
        <Skeleton className="rounded w-80 h-60 my-1 object-contain  " />
        <div className="flex flex-col items-center">
          <h2 className="text-lg sm:text-xl font-bold">
            <Skeleton className="w-40 h-4" />
          </h2>
          <p className="text-xs text-gray-600 mt-1">
            <span className="capitalize font-bold">
              <Skeleton className="w-20 h-4" />
            </span>
            •{" "}
            <span>
              <Skeleton className="w-20 h-4" />{" "}
            </span>
          </p>
          <p className="text-sm text-gray-600 mt-1 tracking-wider leading-6 ">
            <Skeleton className="w-40 h-4" />
          </p>
        </div>
      </div>
    </div>
  );
}
