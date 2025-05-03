"use client";
import { districts } from "@/lib/navbar-items";
import { addNews } from "@/redux/features/news/news-slice";
import { AppDispatch, RootState } from "@/redux/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AddNewsPage() {
  const [newsArticle, setNewsArticle] = React.useState({
    newsTitle: "",
    content: "",
    image: null as File | null,
    district: "",
    author: "",
  });
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { loading } = useSelector((state: RootState) => state.news.generalNews);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setNewsArticle((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file && file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB");
      return;
    }

    setNewsArticle((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("newsTitle", newsArticle.newsTitle);
    formData.append("content", newsArticle.content);
    formData.append("image", newsArticle.image as Blob); // Cast to Blob for FormData
    formData.append("district", newsArticle.district);
    formData.append("author", newsArticle.author);

    try {
      await dispatch(addNews(formData));

      setNewsArticle({
        newsTitle: "",
        content: "",
        image: null,
        district: "",
        author: "",
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      router.push("/?refresh=true");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form. Please try again.");
      return;
    }
  };

  return (
    <section>
      <div className="mx-3 flex flex-col items-center justify-center mt-10 bg-blue-100 rounded p-4">
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
              className="block text-sm font-semibold font-PottiSreeramulu text-gray-700"
            >
              న్యూస్ టైటిల్
            </label>
            <input
              type="text"
              id="newsTitle"
              name="newsTitle"
              value={newsArticle.newsTitle}
              onChange={handleChange}
              className="mt-1 block p-1 w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
              aria-required="true"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="content"
              className="block text-sm text-gray-700 font-semibold font-PottiSreeramulu"
            >
              కంటెంట్
            </label>
            <textarea
              id="content"
              name="content"
              rows={4}
              value={newsArticle.content}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
              aria-required="true"
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="author"
              className="block text-sm font-medium text-gray-700"
            >
              Author
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={newsArticle.author}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
              aria-required="true"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
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
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
              aria-required="true"
            />
            {newsArticle.image && (
              <div className="mt-2">
                <p>Image Preview:</p>
                <Image
                  src={URL.createObjectURL(newsArticle.image)}
                  alt="Preview"
                  width={128}
                  height={128}
                  className="w-32 h-32 object-cover rounded-md"
                />
              </div>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="district"
              className="block text-sm font-medium text-gray-700"
            >
              Districts
            </label>
            <select
              id="district"
              name="district"
              value={newsArticle.district}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
              aria-required="true"
            >
              <option value="">Select a district</option>
              {districts.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className={`px-4 py-2 w-full bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-not-allowed
            `}
            disabled={loading}
            aria-disabled={loading ? "true" : "false"}
          >
            {loading ? "Adding News...." : "Add News"}
          </button>
        </form>
      </div>
    </section>
  );
}
