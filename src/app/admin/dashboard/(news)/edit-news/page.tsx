"use client";
import { AppDispatch } from "@/redux/store";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  NewsArticle,
  updateNews,
} from "@/redux/features/news/news-slice";
import { useRouter } from "next/navigation";
import { districts } from "@/lib/navbar-items";
import { useGetNews } from "@/hooks/UsegetNews";
export default function EditNewsPage() {
  const {newsArticles, loading} = useGetNews()
  const dispatch = useDispatch<AppDispatch>();
  const [newsArticle, setNewsArticle] = React.useState({
    newsTitle: "",
    content: "",
    image: null as File | null,
    district: "",
    author: "",
  });
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const router = useRouter();
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
  const handleEditClick = (articles: NewsArticle) => {
    setNewsArticle({
      newsTitle: articles.newsTitle,
      content: articles.content,
      image: null, // Reset image to null when editing
      district: articles.district,
      author: articles.author,
    });
  };
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    id: string
  ) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("newsTitle", newsArticle.newsTitle);
    formData.append("content", newsArticle.content);
    formData.append("image", newsArticle.image as Blob); // Cast to Blob for FormData
    formData.append("district", newsArticle.district);
    formData.append("author", newsArticle.author);
    formData.append("id", id);

    try {
      await dispatch(updateNews(formData));

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
      router.push("/");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form. Please try again.");
      return;
    }
  };
  return (
    <div>
      <h1 className="text-2xl font-PottiSreeramulu font-bold mt-1 mb-6">
        Edit News
      </h1>
      <div className="border p-2 mb-4 rounded-lg shadow-md">
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
              <Dialog>
                <DialogTrigger className="bg-blue-500 px-3 py-2 rounded-md text-white" onClick={() => handleEditClick(articles)}>
                  Edit
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                      <form
                        className="mt-4"
                        onSubmit={(e) => handleSubmit(e, articles?._id)}
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
                            className="mt-1 block p-2 w-full  border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
                            rows={6}
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
                            className="mt-1 block p-1 w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
                            className="mt-1 p-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
                            className="mt-1 p-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
                          className={`px-4 py-2 w-full bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer ${
                            loading
                              && "cursor-not-allowed opacity-50"
                          
                          }
                    `}
                          disabled={loading}
                          aria-disabled={loading ? "true" : "false"}
                        >
                          {loading ? "Update News...." : "Update News"}
                        </button>
                      </form>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
