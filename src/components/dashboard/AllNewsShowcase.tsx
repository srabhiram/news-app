"use client";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { useFormattedDates } from "@/hooks/useFormatdatetime";
import { isNewPost } from "@/lib/isNewPost";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";
import { newsData } from "@/interface/all-interfaces";
import { NewsArticle } from "@/interface/all-interfaces";

// Assuming EditDailog is a separate component handling the edit form
import { EditDialog } from "./EditDailog";
import { DeleteDailog } from "./DeleteDailog";
import Link from "next/link";
import { SelectChangeEvent } from "@mui/material";
import { revalidateNews } from "@/app/action";

export default function AllNewsShowcase({
  newsArticles,
}: {
  newsArticles: NewsArticle[];
}) {
  const formattedDates = useFormattedDates(newsArticles);
  const [newsArticle, setNewsArticle] = React.useState<newsData>({
    newsTitle: "",
    content: { box1: "", box2: "" },
    image: null as File | null,
    district: "",
    category: "",
    author: "",
    selectionType: "district" as "district" | "category",
  });
  const [loading, setLoading] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    // Handle nested content fields (box1 or box2)
    if (name === "box1" || name === "box2") {
      setNewsArticle((prev) => ({
        ...prev,
        content: {
          ...prev.content,
          [name]: value,
        },
      }));
    } else {
      setNewsArticle((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectionTypeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectionType = e.target.value as "district" | "category";
    setNewsArticle((prev) => ({
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

    setNewsArticle((prev) => ({ ...prev, image: file }));
  };

  const handleEditClick = (article: NewsArticle) => {
    setNewsArticle({
      newsTitle: article.newsTitle,
      content: article.content,
      image: null, // Reset image to null when editing
      district: article.district,
      category: article.category,
      author: article.author,
      selectionType: article.district ? "district" : "category",
    });
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setNewsArticle((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    id: string
  ) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("newsTitle", newsArticle.newsTitle);
    formData.append("content", JSON.stringify(newsArticle.content));
    if (newsArticle.image) {
      formData.append("image", newsArticle.image as Blob);
    }
    formData.append("district", newsArticle.district);
    formData.append("category", newsArticle.category);
    formData.append("author", newsArticle.author);

    try {
      setLoading(true);
      const response = await fetch(`/api/news/update/${id}`, {
        method: "PUT",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) {
        console.log(data || "Something went wrong");
        alert(data.message || "Failed to update news.");
        return;
      }

      setNewsArticle({
        newsTitle: "",
        content: { box1: "", box2: "" },
        image: null,
        district: "",
        category: "",
        author: "",
        selectionType: "district",
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      await revalidateNews()
      await router.push("/");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form. Please try again.");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className=" rounded-xl space-y-2 grid md:grid-cols-4 md:gap-2">
        {newsArticles?.length &&
          newsArticles.map((article, index) => (
            <Card key={`${article._id}-${index}`}>
              <Link href={`/news/${article._id}`} key={article._id}>
                <CardContent className="flex flex-row">
                  <div aria-label={`Read more about ${article.newsTitle}`}>
                    {/* Image Container */}
                    <div className="relative flex-shrink-0 w-full justify-center items-center sm:w-1/3 sm:mr-4 mb-2 sm:mb-0">
                      <Image
                        src={article.image}
                        alt={article.newsTitle}
                        width={400}
                        height={100}
                        style={{ height: "auto", width: "auto" }}
                        className="rounded-md object-cover object-top aspect-video w-full mx-auto"
                        priority
                      />
                      {isNewPost(article.createdAt, 6) && (
                        <span className="absolute -top-4 -left-2">
                          <Badge
                            variant="destructive"
                            className="text-[10px] w-7"
                          >
                            New
                          </Badge>
                        </span>
                      )}
                    </div>

                    {/* Text Content */}
                    <div className="flex-1">
                      <h2 className="text-sm sm:text-base lg:text-lg font-telugu font-bold line-clamp-2 active:underline active:text-blue-600 hover:underline hover:text-blue-600 dark:hover:text-blue-400 sm:transition-colors sm:duration-300">
                        {article.newsTitle}
                      </h2>
                      <p className="py-1 text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1 font-telugu">
                        <span>{formattedDates?.[index] || ""}</span>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Link>
              <CardFooter>
                <div className="flex justify-between w-full">
                  <EditDialog
                    articles={article}
                    fileInputRef={fileInputRef}
                    handleSelectChange={handleSelectChange}
                    handleChange={handleChange}
                    handleEditClick={handleEditClick}
                    handleFileChange={handleFileChange}
                    handleSubmit={handleSubmit}
                    handleSelectionTypeChange={handleSelectionTypeChange} // Added
                    loading={loading}
                    newsData={newsArticle}
                  />
                  <DeleteDailog articles={article} />
                </div>
              </CardFooter>
            </Card>
          ))}
      </div>
    </div>
  );
}
