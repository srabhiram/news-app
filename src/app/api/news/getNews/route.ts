import { GetNews } from "@/controllers/data.controller";
export async function GET() {
  return await GetNews()
}
