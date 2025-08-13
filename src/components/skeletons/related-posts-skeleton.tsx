import React from 'react'
import { Skeleton } from '../ui/skeleton'

export default function RelatedPostSkeleton() {
  return (
   
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
  )
}
