"use client"
import { useFormattedDates } from '@/hooks/useFormatdatetime'
import { NewsArticle } from '@/interface/all-interfaces'
import { extractPublicId } from '@/lib/extract-publiIds'
import { distname } from '@/lib/navbar-items'
import { CldImage } from 'next-cloudinary'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function RelatedPost({relatedPosts}:{relatedPosts:NewsArticle[]}) {
        const formattedRelatedDates = useFormattedDates(relatedPosts)

  return (
   <div className="w-full lg:w-1/3 mt-8 lg:mt-0">
      <h3 className="text-xl sm:text-2xl font-PottiSreeramulu font-bold mb-6">
        <span className="bg-blue-500  p-0.5 mr-1"></span> సంబంధిత వార్తలు
      </h3>
      {relatedPosts?.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 italic">
          No related posts available.
        </p>
      ) : (
        <div className="space-y-4 lg:max-h-[80vh] lg:overflow-y-auto lg:pr-4 lg:sticky lg:top-36">
          {relatedPosts.map((post, index) => (
            <Link
              key={post._id}
              href={`/news/${post._id}`}
              className="flex sm:flex-col max-sm:items-center bg-white dark:bg-zinc-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:scale-[1.02] hover:bg-gray-50 dark:hover:bg-zinc-700 transition-all duration-300 overflow-hidden"
            >
              <div className="max-sm:w-1/3">
                {/* <Image
                  src={post.image}
                  alt={post.newsTitle}
                  width={300}
                  height={96}
                  style={{ height: "auto", width: "auto" }}
                  className="rounded-t-lg object-cover object-top sm:aspect-video mx-auto"
                  priority
                /> */}
<CldImage 
    src={extractPublicId(post.image)}
    alt={post.newsTitle} 
   
    width={300}
    height={200}
    quality="auto:eco"
    format="webp"
    dpr="auto"
    sizes="(max-width: 640px) 33vw, (max-width: 768px) 50vw, 300px"
    className="object-cover object-top sm:aspect-video mx-auto"
    priority
    loading="eager"
    fetchPriority="high"
    placeholder="blur"
  blurDataURL={`https://res.cloudinary.com/djthwdebh/image/upload/w_10,h_6,e_blur:1000,q_auto,f_auto/${extractPublicId(post.image)}`}
  onLoad={() => console.log('Image loaded:', Date.now())}
  onLoadStart={() => console.log('Image load started:', Date.now())}

  decoding="async"
  />
              </div>
              <div className="p-2 max-sm:w-full">
                <h4 className="text-sm font-PottiSreeramulu font-bold line-clamp-2 leading-normal active:text-blue-600 active:underline hover:text-blue-600 hover:underline">
                  {post.newsTitle}
                </h4>
                <div className="p-1 flex items-center gap-1">
                  <b className="text-xs">{distname(post.district)}</b>{" "}
                  {" • "}
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 font-PottiSreeramulu">
                    {" "}
                    {(formattedRelatedDates?.[index]) ?? ""}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
