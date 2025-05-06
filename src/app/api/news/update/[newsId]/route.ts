import { EditNews } from "@/controllers/data.controller";
import { NextRequest } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ newsId: string }> }
) {
  
  const { newsId } = await params;
 return await EditNews(req, newsId)
}
