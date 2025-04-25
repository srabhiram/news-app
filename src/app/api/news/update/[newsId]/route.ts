/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDB from "@/db/connectDB";
import News from "@/db/models/news.models";
import cloudinary from "@/lib/cloudinary";
import { NextRequest } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ newsId: string }> }
) {
  await connectDB();
  const { newsId } = await params;
  const body = await req.formData();
  const newsTitle = body.get("newsTitle");
  const content = body.get("content");
  const file = body.get("image") as File;
  const district = body.get("district");
  const author = body.get("author");

  // delete the existing image from cloudinary
  // Find the article to get the image URL
  const article = await News.findById(newsId);
  if (!article) {
    return new Response("News article not found", { status: 404 });
  }

  // Extract public_id from the image URL
  const imageUrl = article.image;
  const publicIdMatch = imageUrl.match(/\/v\d+\/(.+)\.\w+$/);
  const publicId = publicIdMatch ? publicIdMatch[1] : null;
  // Delete image from Cloudinary
  if (publicId) {
    await cloudinary.uploader.destroy(publicId);
  }
  // Validate the input data
  if (!newsTitle || !content || !file || !district || !author) {
    return new Response("All fields are required", { status: 400 });
  }
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  try {
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "news-images",
            transformation: [
              {
                width: 800,
                height: 600,
                crop: "limit", // maintain aspect ratio
                quality: "auto", // good quality at lower size
                fetch_format: "auto", // convert to WebP/AVIF for browsers that support it
              },
            ],
          },
          (err: any, result: any) => {
            if (err || !result) return reject(err);
            resolve(result);
          }
        )
        .end(buffer);
    });

    const { secure_url } = uploadResult as { secure_url: string };
    const dbResponse = await News.findByIdAndUpdate(
      newsId,
      {
        newsTitle,
        content,
        image: secure_url,
        district,
        author,
      },
      { new: true }
    );
    if (!dbResponse) {
      return new Response("News article not found", { status: 404 });
    }
    console.log("Updated news article:", dbResponse);
    return new Response(JSON.stringify(dbResponse), { status: 200 });
  } catch (error: any) {
    console.error("Error updating news article:", error);
    return new Response("Failed to update news article", { status: 500 });
  }
}
