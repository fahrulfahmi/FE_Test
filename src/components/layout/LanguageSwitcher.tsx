
"use client";

import { Languages } from "lucide-react";
import { useLocale } from "next-intl";

import {
  routing,
  usePathname,
  useRouter,
} from "@/i18n/routing";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const nextLocale = event.target.value as (typeof routing.locales)[number];

    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <div className="relative flex h-10 items-center gap-2 rounded-lg border border-border bg-background px-3 transition-colors hover:bg-muted">
      <Languages className="size-4 shrink-0 text-muted-foreground" />

      <select
        aria-label="Select language"
        value={locale}
        onChange={handleLanguageChange}
        className="w-[75px] cursor-pointer appearance-none bg-transparent text-sm font-medium outline-none"
      >
        {routing.locales.map((item) => (
          <option key={item} value={item}>
            {item.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}
