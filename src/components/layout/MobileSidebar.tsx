
"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

import Sidebar from "./Sidebar";

export default function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open navigation"
        aria-expanded={open}
        className="flex size-10 items-center justify-center rounded-lg border border-border hover:bg-muted"
      >
        <Menu className="size-5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/50"
          />

          <div className="absolute inset-y-0 left-0 w-[280px] shadow-xl">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close sidebar"
              className="absolute right-3 top-5 z-10 flex size-9 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/20"
            >
              <X className="size-5" />
            </button>

            <Sidebar onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
