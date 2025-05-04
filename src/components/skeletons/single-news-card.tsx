import React from "react";
import { Skeleton } from "../ui/skeleton";

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

        {/* Related Posts Skeleton */}
        <div className="w-full lg:w-2/5 mt-8 lg:mt-0">
          <Skeleton className="h-6 w-48 mb-6" /> {/* Related Posts Title */}
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex items-center bg-white rounded-lg border-b">
                <Skeleton className="w-1/3 md:w-1/6 h-20 rounded-lg" /> {/* Image */}
                <div className="flex-1 p-3">
                  <Skeleton className="h-4 w-3/4 mb-2" /> {/* Title */}
                  <Skeleton className="h-3 w-24" /> {/* Date */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}