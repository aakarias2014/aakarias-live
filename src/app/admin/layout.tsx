import { isAdmin } from "@/actions/auth";
import { redirect } from "next/navigation";
import React from "react";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authorized = await isAdmin();
  if (!authorized) {
    redirect("/login");
  }

  return (
    <div className="min-h-[85vh] bg-muted/10">
      {children}
    </div>
  );
}
