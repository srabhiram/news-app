import React from "react";
import { Skeleton } from "../ui/skeleton";
import RelatedPostSkeleton from "./related-posts-skeleton";

export default function SingleNewsCardSkeleton() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row lg:gap-8">
        {/* Main Article Skeleton */}
        <div className="w-full flex flex-col items-center justify-center">
          <Skeleton className="w-full max-w-[400px] h-[300px] rounded-md my-4" />
          <div className="w-full max-w-3xl">
            <Skeleton className="h-8 w-3/4 mb-4" /> {/* Title */}
            <div className="flex items-center justify-between mt-2 border-b pb-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-24" /> {/* Author */}
                <span>•</span>
                <Skeleton className="h-4 w-32" /> {/* Date */}
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5" /> {/* Eye Icon */}
                <Skeleton className="h-4 w-10" /> {/* Views */}
                <Skeleton className="h-5 w-5" /> {/* Share Icon */}
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" /> {/* Content */}
            </div>
          </div>
        </div>

       <RelatedPostSkeleton/>
      </div>
    </div>
  );
}