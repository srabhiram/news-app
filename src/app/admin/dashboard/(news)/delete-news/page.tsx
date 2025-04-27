"use client";
import { deleteNews, getNews } from "@/redux/features/news/news-slice";
import { AppDispatch, RootState } from "@/redux/store";
import Image from "next/image";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function DeleteNewsPage() {
  const { newsArticles } = useSelector((state: RootState) => state.news);
  const dispatch = useDispatch<AppDispatch>();
  const fetchNews = useCallback(() => {
    dispatch(getNews()).unwrap().catch((error) => {
      console.error("Error fetching news articles:", error);
    });
  }, [dispatch]);

  useEffect(() => {
    const abortController = new AbortController();
    fetchNews();
    return abortController.abort()
  }, [fetchNews]);
  const handleDelete = (id: string) => {
    // Dispatch the deleteNews action with the article ID
    dispatch(deleteNews(id))
      .unwrap()
      .then(() => {
        // Optionally, you can show a success message or perform any other actions after deletion
      })
      .catch((error) => {
        // Handle any errors that occur during deletion
        console.error("Error deleting news article:", error);
      });
    dispatch(getNews()).unwrap();
  };

  return (
    <div>
      <h1 className="text-2xl font-PottiSreeramulu font-bold mt-1 mb-6">
        Delete News
      </h1>
      <div className="border p-4 mb-4 rounded-lg shadow-md">
        {newsArticles.length === 0 ? (
          <p className="text-gray-500 italic">No news articles available.</p>
        ) : (
          newsArticles.map((articles) => (
            <div key={articles?._id} className="flex items-center gap-3 mb-1 ">
              {articles?.image && (
                <Image
                  src={articles?.image}
                  alt={articles?.newsTitle}
                  width={200}
                  height={100}
                  unoptimized
                  className="rounded w-28 h-28 object-contain mr-2 flex-shrink-0"
                />
              )}
              <div>
                {" "}
                <h2 className="text-xs sm:text-xl font-semibold">
                  {articles?.newsTitle}
                </h2>
                <p className="text-xs text-gray-600 mt-1">
                  •{" "}
                  <span>
                    {new Date(articles?.createdAt).toLocaleDateString()}
                  </span>
                </p>
              </div>
              <AlertDialog>
                <AlertDialogTrigger className="bg-red-500 px-2 py-1 text-white rounded">
                  Delete
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      this news article and remove the data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-red-500"
                      onClick={() => handleDelete(articles?._id)}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
