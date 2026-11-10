
"use client";

import {
  LayoutDashboard,
  Settings,
  Truck,
} from "lucide-react";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";

interface SidebarProps {
  collapsed?: boolean;
  onNavigate?: () => void;
}

const navigationItems = [
  {
    label: "dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
] as const;

export default function Sidebar({
  collapsed = false,
  onNavigate,
}: SidebarProps) {
  const t = useTranslations("navigation");
  const pathname = usePathname();

  return (
    <aside
      className={`flex h-full flex-col border-r border-border bg-card text-card-foreground transition-all duration-300 ${
        collapsed ? "w-[80px]" : "w-[260px]"
      }`}
    >
      <div
        className={`flex h-20 shrink-0 items-center gap-3 border-b border-border ${
          collapsed ? "justify-center px-3" : "px-6"
        }`}
      >
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-orange-500 shadow-sm shadow-orange-500/20">
          <Truck className="size-6 text-white" />
        </div>

        {!collapsed && (
          <div className="min-w-0">
            <h1 className="text-lg font-bold tracking-wide text-foreground">
              TCM
            </h1>
            <p className="text-xs text-muted-foreground">
              Toll Management
            </p>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-6">
        {!collapsed && (
          <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            {t("mainMenu")}
          </p>
        )}

        <nav className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={onNavigate}
                title={collapsed ? t(item.label) : undefined}
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-orange-500 text-white shadow-sm shadow-orange-500/20 hover:bg-orange-600"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                } ${collapsed ? "justify-center" : ""}`}
              >
                <Icon className="size-5 shrink-0" />

                {!collapsed && <span>{t(item.label)}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="shrink-0 border-t border-border p-3">
        <Link
          href="/settings"
          onClick={onNavigate}
          title={collapsed ? t("settings") : undefined}
          className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <Settings className="size-5 shrink-0" />

          {!collapsed && <span>{t("settings")}</span>}
        </Link>
      </div>
    </aside>
  );
}
