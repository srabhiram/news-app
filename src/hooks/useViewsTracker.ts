"use client"
import { useEffect } from "react";

const useViewTracker = (newsId: string, setViews: (views: number) => void) => {
  useEffect(() => {
    if (typeof window === "undefined" || !newsId) return;

    const key = `viewed-news-${newsId}`;
    if (localStorage.getItem(key)) return;

    // Only send view update in production
    if (process.env.NODE_ENV === "production") {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/news/views/${newsId}`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.views !== undefined) {
            setViews(data.views); // Update views in your UI
            localStorage.setItem(key, "true"); // Mark as viewed
            console.log("View count updated.");
          }
        })
        .catch((err) => console.error("Error incrementing views:", err));
    }
  }, [newsId, setViews]);
};

export default useViewTracker;
