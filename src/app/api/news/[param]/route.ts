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
  const { searchParams } = new URL(req.url);
   const page = parseInt(searchParams.get("page") || "1");
   const limit = parseInt(searchParams.get("limit") || "10");

   const skip = (page - 1) * limit;


  if (mongoose.Types.ObjectId.isValid(param)) {
    const id = param;
    newsArticles = await News.find({ _id: id }).sort({ createdAt: -1 }).lean();
  } else {
    newsArticles = await News.find({
      $or: [{ district: param }, { category: param }],
    })
      .sort({ createdAt: -1 })
      .select("newsTitle image district views category createdAt")
      .skip(skip)
      .limit(limit) // only needed fields
      .lean(); // plain JS objects, faster;
  }

  if (!newsArticles || newsArticles.length === 0) {
    console.log("no articles are found");
    return new Response(JSON.stringify({ message: "No articles found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
 const totalCount = await News.countDocuments();
  return new Response(JSON.stringify({ newsArticles,totalCount }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
