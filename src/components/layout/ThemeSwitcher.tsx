
"use client";

import { useState, useSyncExternalStore } from "react";
import { Laptop, Moon, Sun, SunMoon, Check } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";

const themes = [
  { value: "light", icon: Sun, label: "light" },
  { value: "dark", icon: Moon, label: "dark" },
  { value: "system", icon: Laptop, label: "system" },
] as const;

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const t = useTranslations("common");
  const [open, setOpen] = useState(false);

  const mounted = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  if (!mounted) {
    return (
      <button
        type="button"
        disabled
        aria-label={t("appearance")}
        className="flex size-10 items-center justify-center rounded-lg border border-border bg-card"
      >
        <SunMoon className="size-5" />
      </button>
    );
  }

  const activeTheme =
    themes.find((item) => item.value === theme) ?? themes[2];

  const ActiveIcon = activeTheme.icon;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-label={t("appearance")}
        aria-expanded={open}
        className="flex size-10 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-muted"
      >
        <ActiveIcon className="size-5" />
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="Close theme menu"
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setOpen(false)}
          />

          <div className="absolute right-0 top-12 z-50 w-48 rounded-xl border border-border bg-popover p-2 shadow-lg">
            <p className="px-3 py-2 text-xs font-semibold text-muted-foreground">
              {t("appearance")}
            </p>

            {themes.map((item) => {
              const Icon = item.icon;
              const isActive = theme === item.value;

              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => {
                    setTheme(item.value);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-muted ${
                    isActive
                      ? "bg-muted font-medium text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon className="size-4" />
                    {t(item.label)}
                  </span>

                  {isActive && <Check className="size-4" />}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
