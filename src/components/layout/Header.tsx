
"use client";

import {
  Bell,
  ChevronRight,
  UserCircle,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { usePathname } from "@/i18n/routing";

import LanguageSwitcher from "./LanguageSwitcher";
import MobileSidebar from "./MobileSidebar";
import ThemeSwitcher from "./ThemeSwitcher";

export default function Header() {
  const pathname = usePathname();

  const t = useTranslations("navigation");
  const common = useTranslations("common");
  const auth = useTranslations("auth");

  const currentPage =
    pathname === "/"
      ? "dashboard"
      : pathname.split("/").filter(Boolean).at(-1) ?? "dashboard";

  const pageLabel = t.has(currentPage)
    ? t(currentPage)
    : currentPage;

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur-md sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <MobileSidebar />

        <div className="min-w-0">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="shrink-0">TCM</span>

            <ChevronRight className="size-3.5 shrink-0" />

            <span className="truncate font-medium text-foreground">
              {pageLabel}
            </span>
          </div>

          <p className="mt-1 hidden text-xs text-muted-foreground sm:block">
            {common("brandDescription")}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <LanguageSwitcher />

        <ThemeSwitcher />

        <button
          type="button"
          aria-label={common("notifications")}
          title={common("notifications")}
          className="relative flex size-10 items-center justify-center rounded-lg border border-border transition-colors hover:bg-muted"
        >
          <Bell className="size-5" />

          <span
            aria-hidden="true"
            className="absolute right-2 top-2 size-2 rounded-full bg-orange-500 ring-2 ring-background"
          />
        </button>

        <div className="hidden h-9 w-px bg-border sm:block" />
        <button
          type="button"
          aria-label={auth("administrator")}
          className="flex items-center gap-2 rounded-lg p-1.5 transition-colors hover:bg-muted"
        >
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300">
            <UserCircle className="size-6" />
          </div>

          <div className="hidden text-left md:block">
            <p className="text-sm font-semibold text-foreground">
              {auth("administrator")}
            </p>

            <p className="text-xs text-muted-foreground">
              {auth("systemAdmin")}
            </p>
          </div>
        </button>
      </div>
    </header>
  );
}
