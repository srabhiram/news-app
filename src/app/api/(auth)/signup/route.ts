import { NextRequest } from "next/server";
import { SignupController } from "@/controllers/user.controller";

export async function POST(req: NextRequest) {
  return await SignupController(req);
}
