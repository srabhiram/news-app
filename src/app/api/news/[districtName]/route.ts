import News from "@/db/models/news.models";
import { NextRequest } from "next/server";
import connectDB  from "@/db/connectDB";
export async function GET(req: NextRequest, { params } :{params :{districtName: string}}) {
  connectDB();
const { districtName } = await params;
  console.log(districtName);
  const newsArticles = await News.find({ district:districtName });
    console.log(newsArticles);
  if (!newsArticles || newsArticles.length === 0) {
    return new Response(JSON.stringify({ error: "District not found" }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  // Assuming you want to return the district name and the news articles
    // You can modify this as per your requirement  
  return new Response(JSON.stringify({ newsArticles }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
