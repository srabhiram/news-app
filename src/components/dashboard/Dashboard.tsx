"use client";
import { User } from "@/components/Navbar";
import { getTokenData } from "@/helpers/getTokenData";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { NewsArticle } from "@/interface/all-interfaces";
import AllNewsShowcase from "./AllNewsShowcase";

interface dashboardProps {
  newsArticles: NewsArticle[];
}

export default function AdminDashboard({ newsArticles }: dashboardProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  useEffect(() => {
    const data = getTokenData();
    setCurrentUser(data);
  }, []);
  return (
    <>
      <div className="flex flex-col items-center justify-center mt-4  dark:bg-zinc-900  dark:text-zinc-200">
        <h2 className="text-xl sm:text-3xl font-medium">
          అడ్మిన్ డాష్‌బోర్డ్‌కు స్వాగతం <br />
          <span className="text-center flex justify-center">
            {" "}
            {currentUser?.name}
          </span>
        </h2>

        <div className="flex flex-col w-full  items-end justify-end mr-2 mb-2">
          <Link
            href="/admin/dashboard/add-news"
            className="bg-blue-600 hover:bg-blue-800 active:bg-blue-800 px-4 py-2 rounded text-white"
          >
            Add news
          </Link>
        </div>
        <div className=" w-full p-2 rounded-lg ">
          <AllNewsShowcase newsArticles={newsArticles} />
        </div>
      </div>
    </>
  );
}
