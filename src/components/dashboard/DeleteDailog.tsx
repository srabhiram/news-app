import React, { useState } from "react";
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
} from "../ui/alert-dialog";
import { NewsArticle } from "@/redux/features/news/news-slice";
import { LucideLoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { fetcNews } from "@/lib/fetchNews";

interface deleteDailogProps {
  articles: NewsArticle;
}
export const DeleteDailog = ({ articles }: deleteDailogProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/news/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        return console.log(data.error || "Something went wrong");
      }
      await fetcNews("no-store");

      await router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={`${
          loading
            ? "bg-red-400 px-2 py-1 text-white rounded-md"
            : " bg-red-500 px-2 py-1 text-white rounded-md"
        }`}
      >
        {loading ? (
          <span className="flex items-center gap-1">
            Deleting <LucideLoaderCircle size={15} className="animate-spin" />
          </span>
        ) : (
          "Delete"
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this news
            article and remove the data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={`bg-red-500 cursor-pointer ${
              loading && "bg-red-300 cursor-not-allowed"
            }`}
            disabled={loading}
            onClick={() => handleDelete(articles?._id)}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
