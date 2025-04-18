import News from "@/db/models/news.models";
import connectDB from "@/db/connectDB";
export async function GET() {
  //    fetch from mongodb and return all news articles
  try {
    await connectDB();
    const news = await News.find({}).sort({ createdAt: -1 });
    console.log("Fetched news articles:", news);
    return new Response(JSON.stringify({ newsArticles: news }), { status: 200 });
  } catch (error) {
    console.error("Error fetching news articles:", error);
    return new Response("Error fetching news articles", { status: 500 });
  }
}
