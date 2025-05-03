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

export default function EditLayout({
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
            <BreadcrumbLink className="font-semibold"><Link href={`/admin/dashboard`}>Dashboard</Link></BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold">Edit News</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {children}
    </>
  );
}
