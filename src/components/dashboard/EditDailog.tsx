"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { categories, districts } from "@/lib/navbar-items";
import { newsData } from "@/interface/all-interfaces";
import { NewsArticle } from "@/redux/features/news/news-slice";

interface EditDailogProps {
  articles: NewsArticle;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  handleSelectionTypeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEditClick: (article: NewsArticle) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>, id: string) => void;
  loading: boolean;
  newsData: newsData;
}

export function EditDailog({
  articles,
  fileInputRef,
  handleChange,
  handleSelectionTypeChange,
  handleEditClick,
  handleFileChange,
  handleSubmit,
  loading,
  newsData,
}: EditDailogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 text-white" onClick={() => handleEditClick(articles)}>Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto bg-white dark:bg-zinc-800 dark:text-zinc-200">
        <DialogHeader>
          <DialogTitle id="edit-news-title">Edit News</DialogTitle>
          <DialogDescription>
            Update the news article details below.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => handleSubmit(e, articles._id)}
          aria-labelledby="edit-news-title"
        >
          <div className="mb-4">
            <label
              htmlFor="newsTitle"
              className="block text-sm font-semibold font-PottiSreeramulu text-zinc-700 dark:text-zinc-200"
            >
              న్యూస్ టైటిల్
            </label>
            <input
              type="text"
              id="newsTitle"
              name="newsTitle"
              value={newsData.newsTitle}
              onChange={handleChange}
              className="my-1 block h-10 p-1 w-full border dark:text-zinc-200 placeholder:dark:text-zinc-200 dark:bg-zinc-700 border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              required
              aria-required="true"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="content"
              className="block text-sm text-zinc-700 dark:text-zinc-200 font-semibold font-PottiSreeramulu"
            >
              కంటెంట్
            </label>
            <textarea
              id="content"
              name="content"
              rows={8}
              value={newsData.content}
              onChange={handleChange}
              className="mt-1 block w-full border placeholder:dark:text-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 overflow-y-auto"
              required
              aria-required="true"
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="author"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-200"
            >
              Author
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={newsData.author}
              onChange={handleChange}
              className="my-1 block h-10 w-full border placeholder:dark:text-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
              aria-required="true"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-200"
            >
              Image Upload
            </label>
            <input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="my-1 block h-8 p-1 w-full border placeholder:dark:text-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            {newsData.image ? (
              <div className="mt-2">
                <p>Image Preview:</p>
                <Image
                  src={URL.createObjectURL(newsData.image)}
                  alt="Preview"
                  width={128}
                  height={128}
                  className="w-32 h-32 object-cover rounded-md"
                />
              </div>
            ) : (
              articles.image && (
                <div className="mt-2">
                  <p>Current Image:</p>
                  <Image
                    src={articles.image}
                    alt="Current"
                    width={128}
                    height={128}
                    className="w-32 h-32 object-cover rounded-md"
                  />
                </div>
              )
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200">
              Select Type
            </label>
            <div className="flex gap-4 my-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="selectionType"
                  value="district"
                  checked={newsData.selectionType === "district"}
                  onChange={handleSelectionTypeChange}
                  className="mr-2"
                />
                District
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="selectionType"
                  value="category"
                  checked={newsData.selectionType === "category"}
                  onChange={handleSelectionTypeChange}
                  className="mr-2"
                />
                Category
              </label>
            </div>
          </div>
          {newsData.selectionType === "district" ? (
            <div className="mb-4">
              <label
                htmlFor="district"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-200"
              >
                Districts
              </label>
              <select
                id="district"
                name="district"
                value={newsData.district}
                onChange={handleChange}
                className="my-1 block h-10 p-1 w-full border placeholder:dark:text-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
                aria-required="true"
              >
                <option value="">Select a district</option>
                {districts.map((item) => (
                  <option
                    key={item.value}
                    value={item.value}
                    className="text-zinc-700 dark:text-zinc-200 dark:bg-zinc-700"
                  >
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="mb-4">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-200"
              >
                Categories
              </label>
              <select
                id="category"
                name="category"
                value={newsData.category}
                onChange={handleChange}
                className="my-1 block h-10 p-1 w-full border placeholder:dark:text-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
                aria-required="true"
              >
                <option value="">Select a category</option>
                {categories.map((item) => (
                  <option
                    key={item.value}
                    value={item.value}
                    className="text-zinc-700 dark:text-zinc-200 dark:bg-zinc-700"
                  >
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          )}
          <Button
            type="submit"
            className={`${
              !loading
                ? "px-4 py-2 w-full bg-blue-600 text-white rounded-md hover:bg-blue-700 active:bg-blue-700"
                : "opacity-55 bg-blue-600 px-4 py-2 w-full rounded-md text-white"
            }`}
            disabled={loading}
            aria-disabled={loading ? "true" : "false"}
          >
            {loading ? (
              <span className="flex items-center justify-center mx-auto">
                <LoaderCircle className="animate-spin transition-all" />
              </span>
            ) : (
              "Update News"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
