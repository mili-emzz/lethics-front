import React from "react";
import { PlataformaNav } from "@/components/layout/PlataformaNav";
import { BottomNav } from "@/components/layout/BottomNav";

export default function PlataformaLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF5EC]">
      <PlataformaNav />
      <main className="flex-1 pb-20 lg:pb-10">{children}</main>
      <BottomNav />
    </div>
  );
}
