/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDB from "@/db/connectDB";
import News from "@/db/models/news.models";
import { NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB;
    const { id } = await params;

    // Use $inc to increment the views field
    const news = await News.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } }, // Increment views by 1
      { new: true } // Return the updated document
    );

    console.log(news);
    if (news) {
      return new Response(JSON.stringify(news), { status: 201 });
    } else {
      return new Response("News not found", { status: 404 });
    }
  } catch (error: any) {
    console.error("Error updating views:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
