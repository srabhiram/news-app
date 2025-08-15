"use client";
import { useState, useEffect } from "react";
import { CldImage } from "next-cloudinary";
import { categoryNames, distname } from "@/lib/navbar-items";
import { FaEye } from "react-icons/fa";
import Link from "next/link";
import { NewsArticle } from "@/interface/all-interfaces";
import Image from "next/image";

interface CarouselProps {
  newsArticles: NewsArticle[];
}

const CarouselWithPagination: React.FC<CarouselProps> = ({ newsArticles }) => {
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const articles = newsArticles.slice(0, 5);
  // Prevent hydration mismatches
  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!mounted || articles.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % articles.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [mounted, articles.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % articles.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? articles.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };


  // No articles state
  if (articles.length === 0) {
    return (
      <div className="relative w-full h-64 md:h-[30rem] bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
        <p className="text-gray-500">No articles available</p>
      </div>
    );
  }

  // Client-side render: Full interactive carousel
  return (
    <div className="relative w-full h-64 md:h-[30rem] bg-gray-100 rounded-lg overflow-hidden group">
      {/* Carousel Images */}
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {articles.map((article, index) => (
          <div
            key={article._id}
            className="w-full h-full flex-shrink-0 relative"
          >
            <Link href={`/news/${article._id}`}>
              <Image
                src={article.image}
                alt={article.newsTitle}
                width={800}
                height={400}
                className="w-full h-full object-cover"
                priority={index === 0}
              />

              {/* Overlay with article info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h3 className="text-white text-sm md:text-base font-semibold line-clamp-2 mb-1">
                  {article.newsTitle}
                </h3>

                <div className="flex items-center justify-between mt-2">
                  <span className="text-white/70 text-xs">
                    By {article.author}
                  </span>
                  <div className="flex items-center space-x-3 text-white/70 text-xs">
                    <b className="inline">
                      {article.district
                        ? distname(article.district)
                        : categoryNames(article.category)}
                    </b>
                    <span className="flex gap-1.5 items-center font-medium">
                      <FaEye /> {article.views}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors opacity-0 group-hover:opacity-100 duration-300"
        aria-label="Previous slide"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors opacity-0 group-hover:opacity-100 duration-300"
        aria-label="Next slide"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-2">
          {articles.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                index === currentIndex
                  ? "bg-white"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Slide Counter */}
      <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
        {currentIndex + 1} / {articles.length}
      </div>
    </div>
  );
};

export default CarouselWithPagination;
