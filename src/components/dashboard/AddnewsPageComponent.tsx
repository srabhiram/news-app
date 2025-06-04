"use client";
import { categories, districts } from "@/lib/navbar-items";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaSpinner } from "react-icons/fa";

export default function AddNewsPageComponent() {
  const [newsData, setnewsData] = React.useState({
    newsTitle: "",
    content: "",
    image: null as File | null,
    district: "",
    category: "",
    author: "",
    selectionType: "district" as "district" | "category",
  });
  const [loading, setLoading] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setnewsData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectionTypeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectionType = e.target.value as "district" | "category";
    setnewsData((prev) => ({
      ...prev,
      selectionType,
      district: selectionType === "category" ? "" : prev.district,
      category: selectionType === "district" ? "" : prev.category,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file && file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB");
      return;
    }

    setnewsData((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("newsTitle", newsData.newsTitle);
    formData.append("content", newsData.content);
    formData.append("image", newsData.image as Blob);
    formData.append("author", newsData.author);
    formData.append("district", newsData.district);
    formData.append("category", newsData.category);

    try {
      // await dispatch(addNews(formData));
      setLoading(true);
      const response = await fetch("/api/news/add", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) {
        return console.log(data.message || "Something went wrong");
      }

      setnewsData({
        newsTitle: "",
        content: "",
        image: null,
        district: "",
        category: "",
        author: "",
        selectionType: "district",
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setLoading(false);
      // await dispatch(getNews());
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form. Please try again.");
      return;
    }
  };

  return (
    <section>
      <div className="mx-3 flex flex-col items-center justify-center my-5 sm:mt-10 bg-white dark:bg-zinc-800 dark:text-zinc-200 rounded-xl p-6">
        <h1 id="add-news-title" className="text-2xl font-bold">
          Add News
        </h1>
        <form
          className="mt-4"
          onSubmit={handleSubmit}
          aria-labelledby="add-news-title"
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
              rows={14}
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
              required
              aria-required="true"
            />
            {newsData.image && (
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
          <button
            type="submit"
            className={`${
              !loading
                ? "px-4 py-2 w-full bg-blue-600 text-white rounded-md hover:bg-blue-700 active:bg-blue-700"
                : "opacity-55 bg-blue-600 px-4 py-2 w-full rounded-md text-white"
            } `}
            disabled={loading}
            aria-disabled={loading ? "true" : "false"}
          >
            {loading ? (
              <span className="flex items-center justify-center mx-auto">
                <LoaderCircle className="animate-spin transition-all  " />
              </span>
            ) : (
              "Add News"
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
