"use client";
import { User } from "@/components/Navbar";
import { getTokenData } from "@/helpers/getTokenData";
import Link from "next/link";
import React, { useEffect, useState } from "react";


export default function AdminDashboard() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  useEffect(() => {
    const data = getTokenData();
    setCurrentUser(data);
  }, []);
  return (
    <>

      <div className="flex flex-col items-center justify-center mt-4">
      <h2 className="text-xl sm:text-3xl font-medium">అడ్మిన్ డాష్‌బోర్డ్‌కు స్వాగతం <br /><span className="text-center flex justify-center"> {currentUser?.name}</span></h2>

        <div className="flex flex-col items-center justify-center w-full bg-blue-200 p-5 rounded-lg shadow-md sm:w-96 mt-5">
          <div className="flex flex-col w-full gap-5 items-center justify-center mt-4">
            <Link
              href="/admin/dashboard/add-news"
              className="bg-blue-400 active:bg-blue-800 px-4 py-2 rounded"
            >
              Add news
            </Link>
            <Link
              href="/admin/dashboard/edit-news"
              className="bg-blue-400 active:bg-blue-800 px-4 py-2 rounded"
            >
              Edit News
            </Link>
            <Link
              href="/admin/dashboard/delete-news"
              className="bg-blue-400 active:bg-blue-800 px-4 py-2 rounded"
            >
              Delete News
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
