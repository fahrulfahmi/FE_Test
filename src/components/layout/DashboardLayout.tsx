
"use client";

import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import MobileSidebar from "./MobileSidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[260px] border-r border-border bg-card lg:block">
        <Sidebar />
      </aside>
      <div className="min-h-screen lg:pl-[260px]">
        <Header />

        <main className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8 xl:px-10">
          {children}
        </main>
      </div>
      <MobileSidebar />
    </div>
  );
}
