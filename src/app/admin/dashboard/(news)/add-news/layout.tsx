import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

export default function AddNewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="ml-4 my-0">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
 <BreadcrumbLink asChild className="font-semibold dark:text-zinc-300 dark:hover:text-zinc-300 text-zinc-800"><Link href="/admin/dashboard">Dashboard</Link></BreadcrumbLink>            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold dark:text-zinc-100 opacity-55">Add News</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {children}
    </>
  );
}
