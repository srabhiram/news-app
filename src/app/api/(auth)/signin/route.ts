import { NextRequest } from "next/server";
import { SigninController } from "@/controllers/auth.controller";

export async function POST(req: NextRequest) {
  return await SigninController(req);
}
