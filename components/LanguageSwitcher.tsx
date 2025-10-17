"use client";

import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {Button} from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {Globe, Check} from "lucide-react";

const LOCALES = [
  {code: "fr", short: "FR", label: "Français", flag: "🇫🇷"},
  {code: "en", short: "EN", label: "English", flag: "🇬🇧"},
  {code: "ar", short: "AR", label: "العربية", flag: "🇲🇦"},
] as const;

function buildTargetUrl({
  pathname,
  search,
  target,
}: {
  pathname: string;
  search: string;
  target: string;
}) {
  const segments = pathname.split("/"); // ex: ["", "fr", "catalogue", ...]
  // si le 1er segment est déjà une locale → on le remplace
  if (LOCALES.some((l) => l.code === segments[1])) {
    segments[1] = target;
    const base = segments.join("/") || "/";
    return `${base}${search ? `?${search}` : ""}`;
  }
  // sinon, on préfixe simplement par la locale
  return `/${target}${pathname}${search ? `?${search}` : ""}`;
}

export default function LanguageSwitcher({
  variant = "ghost",
  size = "sm",
}: {
  variant?: React.ComponentProps<typeof Button>["variant"];
  size?: React.ComponentProps<typeof Button>["size"];
}) {
  const pathname = usePathname() || "/";
  const search = useSearchParams()?.toString() || "";
  const router = useRouter();

  const seg1 = pathname.split("/")[1];
  const current =
    LOCALES.find((l) => l.code === seg1)?.code ?? "fr";

  const currentShort =
    LOCALES.find((l) => l.code === current)?.short ?? "FR";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className="gap-2 rounded-full px-3"
          aria-label="Change language"
        >
          <Globe className="h-4 w-4" />
          <span className="font-medium">{currentShort}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="min-w-[12rem]">
        <DropdownMenuLabel>Langue</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {LOCALES.map((l) => {
          const url = buildTargetUrl({pathname, search, target: l.code});
          const active = current === l.code;
          return (
            <DropdownMenuItem
              key={l.code}
              onClick={() => router.push(url)}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span className="text-base leading-none">{l.flag}</span>
                <span>{l.label}</span>
                <span className="ml-2 text-xs text-muted-foreground">
                  {l.short}
                </span>
              </div>
              {active && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
