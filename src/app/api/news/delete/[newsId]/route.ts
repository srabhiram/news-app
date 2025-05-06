import { NextRequest } from "next/server";
import { DeleteNews } from "@/controllers/data.controller";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ newsId: string }> }
) {
  const { newsId } = await params;
  return await DeleteNews(req, newsId);
}
