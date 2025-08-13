"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button, CircularProgress } from "@mui/material";
import { NewsArticle } from "@/interface/all-interfaces";
import AllNewsShowcase from "./AllNewsShowcase";
import AllNewsInfinite from "./infinite-scroll-news";

interface DashboardProps {
  initialData: NewsArticle[];
  currentUser: { id: string; name: string; email: string; isAdmin: boolean } | null;
}

export default function AdminDashboard({ initialData, currentUser }: DashboardProps) {
  

  return (
    <div className="flex flex-col items-center justify-center mt-4 dark:bg-zinc-900 dark:text-zinc-200">
      <h2 className="text-xl sm:text-3xl font-medium">
        అడ్మిన్ డాష్‌బోర్డ్‌కు స్వాగతం <br />
        <span className="text-center flex justify-center">
          {currentUser?.name}
        </span>
      </h2>

      <div className="flex flex-col w-full items-end justify-end mr-2 mb-2">
        <Link href="/admin/dashboard/add-news">
          <Button variant="contained" sx={{ textTransform: "none" }}>
            Add News
          </Button>
        </Link>
      </div>

      <div className="w-full p-2 rounded-lg">
       <AllNewsInfinite initialData={initialData}/>
      </div>

      
    </div>
  );
}
