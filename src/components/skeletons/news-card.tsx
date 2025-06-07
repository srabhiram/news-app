import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function NewsCardSkeleton() {
  return (<div className="flex flex-col gap-3">{Array.from({ length: 5 }).map((_, index) => (
    <div
      key={index}
      className="flex flex-col sm:flex-row items-start sm:items-center bg-white dark:bg-zinc-800 rounded-lg shadow-sm p-3"
    >
      {/* Image Skeleton */}
      <div className="relative flex-shrink-0 w-full sm:w-1/3 sm:mr-4 mb-2 sm:mb-0">
        <Skeleton className="aspect-video w-full rounded-md" />
      </div>

      {/* Text Skeleton */}
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  ))}</div>)
}
