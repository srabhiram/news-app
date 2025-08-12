import { GetNews } from "@/controllers/data.controller";
import { NextRequest } from "next/server";
export async function GET(req:NextRequest) {
  return await GetNews(req)
}
