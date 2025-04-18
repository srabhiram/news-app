import Link from "next/link";
import React from "react";

export default function AdminDashboardPage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center mt-4">
        <h1 className="text-xl font-semibold">Welcome to Admin Dashboard</h1>
        <div className="flex flex-col items-center justify-center bg-blue-200 p-5 rounded-lg shadow-md sm:w-96 mt-16">
          <h2 className="text-lg font-medium">Hello Admin</h2>
          <div className="flex flex-wrap gap-5 items-center justify-center mt-4">
            <Link
              href="/admin/dashboard/add-news"
              className="bg-blue-400 px-4 py-2 rounded"
            >
              Add news
            </Link>
            <Link
              href="/admin/dashboard/edit-news"
              className="bg-blue-400 px-4 py-2 rounded"
            >
              Edit News
            </Link>
            <Link
              href="/admin/dashboard/delete-news"
              className="bg-blue-400 px-4 py-2 rounded"
            >
              Delete News
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
