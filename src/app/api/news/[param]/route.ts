/* eslint-disable @typescript-eslint/no-explicit-any */
import News from "@/db/models/news.models";
import { NextRequest } from "next/server";
import connectDB from "@/db/connectDB";
import mongoose from "mongoose";
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ param: string }> }
) {
  connectDB();
  let newsArticles: any[] = [];
  const { param } = await params;
  console.log(param);
  if (mongoose.Types.ObjectId.isValid(param)) {
    const id = param;
    newsArticles = await News.find({ _id: id }).sort({ createdAt: -1 });
  } else {
    newsArticles = await News.find({ district: param }).sort({ createdAt: -1 });
  }
  if (!newsArticles || newsArticles.length === 0) {
    return new Response(JSON.stringify({ message: "No articles found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
  return new Response(JSON.stringify({ newsArticles }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
