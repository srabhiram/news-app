/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";
import News from "@/db/models/news.models";
import connectDB from "@/db/connectDB";

export async function POST(request: NextRequest) {
  await connectDB();
  const body = await request.json();
  const { newsTitle, description, image, district, author } = body;

  // Validate the input data
  if (!newsTitle || !description || !image || !district || !author) {
    return new Response("All fields are required", { status: 400 });
  }

  try {
    // Create a new news item
    const newNews = await News.create({
      newsTitle,
      description,
      image,
      district,
      author,
      comments: [],
      likes: 0,
    });

    return new Response(JSON.stringify(newNews), { status: 201 });
  } catch (error: any) {
    console.error("Error creating news:", error);
    return new Response("Error creating news", { status: 500 });
  }
}