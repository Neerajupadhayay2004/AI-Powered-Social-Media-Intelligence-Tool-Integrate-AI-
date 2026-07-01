import { Link, useRouterState } from "@tanstack/react-router";
import { Activity, Search, MessageSquare, Shield, ScanLine, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Dashboard", icon: Activity },
  { to: "/analyze", label: "Analyze", icon: ScanLine },
  { to: "/history", label: "History", icon: Search },
  { to: "/chat", label: "Assistant", icon: MessageSquare },
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("sentinel-theme");
    const isDark = stored ? stored === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.toggle("dark", isDark);
    setDark(isDark);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("sentinel-theme", next ? "dark" : "light");
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-foreground/20 bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-8 w-8 shrink-0 place-items-center border border-foreground bg-foreground text-background">
              <Shield className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <div className="font-mono text-sm font-bold leading-none tracking-tight">
                SENTINEL<span className="text-muted-foreground">/AI</span>
              </div>
              <div className="mt-0.5 hidden font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:block">
                Social Media Intelligence
              </div>
            </div>
          </Link>
          <nav className="ml-auto hidden items-center gap-1 md:flex">
            {nav.map((n) => {
              const active = pathname === n.to;
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={cn(
                    "flex items-center gap-2 border border-transparent px-3 py-1.5 font-mono text-xs uppercase tracking-widest transition-colors",
                    active
                      ? "border-foreground bg-foreground text-background"
                      : "hover:border-foreground/40 hover:bg-accent",
                  )}
                >
                  <n.icon className="h-3.5 w-3.5" />
                  {n.label}
                </Link>
              );
            })}
          </nav>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="ml-auto grid h-8 w-8 shrink-0 place-items-center border border-foreground/40 hover:bg-accent md:ml-0"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
        {/* Mobile nav */}
        <nav className="flex items-center gap-1 overflow-x-auto border-t border-foreground/10 px-2 py-1 md:hidden">
          {nav.map((n) => {
            const active = pathname === n.to;
            return (
              <Link
                key={n.to}
                to={n.to}
                className={cn(
                  "flex shrink-0 items-center gap-1.5 border px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest",
                  active
                    ? "border-foreground bg-foreground text-background"
                    : "border-foreground/20 hover:bg-accent",
                )}
              >
                <n.icon className="h-3 w-3" />
                {n.label}
              </Link>
            );
          })}
        </nav>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6">{children}</main>

      <footer className="border-t border-foreground/20 py-4">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          <span>Sentinel/AI · OSINT analytics for public content only</span>
          <span>v0.1 · No scraping · No ToS violations</span>
        </div>
      </footer>
    </div>
  );
}
