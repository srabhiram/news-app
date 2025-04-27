import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function NewsCardSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="flex flex-row sm:flex-row items-center mb-4 p-2"
        >
          <div className="flex-shrink-0 mr-3 sm:mr-4">
            <Skeleton className="rounded w-20 h-20 sm:w-32 sm:h-32 lg:w-40 lg:h-40" />
          </div>
          <div className="flex-1">
            <Skeleton className="w-40 h-4 sm:w-48 sm:h-5 lg:w-56 lg:h-6 mb-2" />
            <Skeleton className="w-20 h-3 sm:w-24 sm:h-4" />
          </div>
        </div>
      ))}
    </div>
  );
}