import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "SignUp - SRS News",
};
export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
