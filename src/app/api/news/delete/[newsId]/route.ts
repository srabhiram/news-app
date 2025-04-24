import connectDB from "@/db/connectDB";
import News from "@/db/models/news.models";
import { NextRequest } from "next/server";
import cloudinary from "@/lib/cloudinary"; // import your cloudinary config

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ newsId: string }> }
) {
  const { newsId } = await params;

  try {
    await connectDB();
    console.log("Deleting news article with ID:", newsId);

    // Find the article to get the image URL
    const article = await News.findById(newsId);
    if (!article) {
      return new Response("News article not found", { status: 404 });
    }

    // Extract public_id from the image URL
    const imageUrl = article.image;
    const publicIdMatch = imageUrl.match(/\/v\d+\/(.+)\.\w+$/);
    const publicId = publicIdMatch ? publicIdMatch[1] : null;

    // Delete article from DB
    await News.findByIdAndDelete(newsId);

    // Delete image from Cloudinary
    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
      console.log("Deleted image from Cloudinary:", publicId);
    }

    const updatedNewsList = await News.find({});
    return new Response(JSON.stringify(updatedNewsList), { status: 200 });
  } catch (error: any) {
    console.error("Error deleting news article:", error);
    return new Response("Failed to delete news article", { status: 500 });
  }
}
