import React from "react";
import AddNews from "@/components/dashboard/AddNews";
import { revalidateTag } from "next/cache";

export default async function AddNewsPage() {
  
  return <AddNews/>
}
