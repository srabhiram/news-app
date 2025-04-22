/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";
import News from "@/db/models/news.models";
import connectDB from "@/db/connectDB";
import cloudinary from "@/lib/cloudinary";

export async function POST(request: NextRequest) {
  await connectDB();
  const body = await request.formData();
  console.log("body", body);
  const newsTitle = body.get("newsTitle");
  const content = body.get("content");
  const file = body.get("image") as File;
  const district = body.get("district");
  const author = body.get("author");

  // Validate the input data
  if (!newsTitle || !content || !file || !district || !author) {
    return new Response("All fields are required", { status: 400 });
  }
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  console.log("buffer", buffer);
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

    // Create a new news item
    const newNews = await News.create({
      newsTitle,
      content,
      image: secure_url, // Updated to use secure_url for the image
      district,
      author,
    });

    return new Response(JSON.stringify(newNews), { status: 201 });
  } catch (error: any) {
    console.error("Error creating news:", error);
    return new Response("Error creating news", { status: 500 });
  }
}
