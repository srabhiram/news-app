import { NextRequest } from "next/server";
import { AddNews } from "@/controllers/data.controller";

export async function POST(request: NextRequest) {
 return AddNews(request)
}
