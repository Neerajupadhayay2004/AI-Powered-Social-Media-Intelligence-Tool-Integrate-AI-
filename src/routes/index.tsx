import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { RiskBadge } from "@/components/risk-badge";
import { loadHistory } from "@/lib/history-store";
import type { StoredAnalysis } from "@/lib/analysis-types";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Activity, AlertOctagon, ScanLine, ShieldAlert, Hash } from "lucide-react";

export const Route = createFileRoute("/")({ component: Dashboard });

function useHistory(): StoredAnalysis[] {
  const [list, setList] = useState<StoredAnalysis[]>([]);
  useEffect(() => {
    const sync = () => setList(loadHistory());
    sync();
    window.addEventListener("sentinel:history", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("sentinel:history", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return list;
}

function Dashboard() {
  const history = useHistory();

  const stats = useMemo(() => {
    const total = history.length;
    const critical = history.filter((h) => h.result.risk_level === "Critical").length;
    const high = history.filter((h) => h.result.risk_level === "High").length;
    const avgRisk = total
      ? Math.round(history.reduce((s, h) => s + (h.result.risk_score || 0), 0) / total)
      : 0;
    const scams = history.filter((h) => (h.result.scam_probability ?? 0) >= 50).length;
    return { total, critical, high, avgRisk, scams };
  }, [history]);

  const trend = useMemo(() => {
    const buckets = new Map<string, { day: string; count: number; risk: number }>();
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const k = d.toISOString().slice(5, 10);
      buckets.set(k, { day: k, count: 0, risk: 0 });
    }
    for (const h of history) {
      const k = new Date(h.createdAt).toISOString().slice(5, 10);
      const b = buckets.get(k);
      if (b) {
        b.count += 1;
        b.risk = Math.max(b.risk, h.result.risk_score || 0);
      }
    }
    return Array.from(buckets.values());
  }, [history]);

  const categoryPie = useMemo(() => {
    const m = new Map<string, number>();
    for (const h of history) {
      const k = h.result.threat_category || "None";
      m.set(k, (m.get(k) ?? 0) + 1);
    }
    return Array.from(m.entries()).map(([name, value]) => ({ name, value }));
  }, [history]);

  return (
    <AppShell>
      <div className="mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:flex sm:justify-between">
        <div className="min-w-0">
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            // Command Console
          </div>
          <h1 className="mt-1 truncate text-3xl font-black tracking-tight sm:text-4xl">
            Threat Intelligence Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Analyze public social media content for scams, phishing, hate, threats, and sentiment.
          </p>
        </div>
        <Link
          to="/analyze"
          className="inline-flex shrink-0 items-center gap-2 border border-foreground bg-foreground px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest text-background hover:opacity-90"
        >
          <ScanLine className="h-4 w-4" /> New Analysis
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat icon={<Activity className="h-4 w-4" />} label="Total Analyses" value={stats.total} />
        <Stat icon={<ShieldAlert className="h-4 w-4" />} label="Avg Risk" value={`${stats.avgRisk}`} suffix="/100" />
        <Stat icon={<AlertOctagon className="h-4 w-4" />} label="High + Critical" value={stats.high + stats.critical} />
        <Stat icon={<Hash className="h-4 w-4" />} label="Likely Scams" value={stats.scams} />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <div className="rounded-none border border-foreground/20 bg-card p-5 lg:col-span-2">
          <SectionHeader title="7-Day Activity" />
          <div className="h-64">
            <ResponsiveContainer>
              <AreaChart data={trend}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="2 4" vertical={false} />
                <XAxis dataKey="day" tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} />
                <YAxis tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} width={28} />
                <Tooltip
                  contentStyle={{
                    background: "var(--background)",
                    border: "1px solid var(--border)",
                    borderRadius: 0,
                    fontSize: 11,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="var(--foreground)"
                  fill="var(--foreground)"
                  fillOpacity={0.15}
                />
                <Area
                  type="monotone"
                  dataKey="risk"
                  stroke="var(--foreground)"
                  strokeDasharray="4 3"
                  fill="none"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-none border border-foreground/20 bg-card p-5">
          <SectionHeader title="Threat Categories" />
          {categoryPie.length ? (
            <div className="h-64">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={categoryPie}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={40}
                    outerRadius={80}
                    stroke="var(--background)"
                  >
                    {categoryPie.map((_, i) => (
                      <Cell
                        key={i}
                        fill={`color-mix(in oklab, var(--foreground) ${100 - i * 15}%, transparent)`}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "var(--background)",
                      border: "1px solid var(--border)",
                      borderRadius: 0,
                      fontSize: 11,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <EmptyMini label="No categories yet" />
          )}
        </div>
      </div>

      <div className="mt-4 rounded-none border border-foreground/20 bg-card">
        <div className="flex items-center justify-between border-b border-foreground/20 p-4">
          <SectionHeader title="Recent Analyses" noMargin />
          <Link
            to="/history"
            className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground"
          >
            View all →
          </Link>
        </div>
        {history.length === 0 ? (
          <Empty />
        ) : (
          <ul className="divide-y divide-foreground/10">
            {history.slice(0, 6).map((h) => (
              <li key={h.id}>
                <Link
                  to="/history/$id"
                  params={{ id: h.id }}
                  className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 p-4 hover:bg-accent sm:grid-cols-[80px_minmax(0,1fr)_auto_auto]"
                >
                  <span className="hidden font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:block">
                    {new Date(h.createdAt).toLocaleDateString(undefined, {
                      month: "short",
                      day: "2-digit",
                    })}
                  </span>
                  <span className="min-w-0 truncate text-sm">{h.content.slice(0, 140)}</span>
                  <span className="hidden font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:block">
                    {h.result.classification}
                  </span>
                  <RiskBadge level={h.result.risk_level} />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AppShell>
  );
}

function SectionHeader({ title, noMargin }: { title: string; noMargin?: boolean }) {
  return (
    <div
      className={`flex items-center gap-2 ${noMargin ? "" : "mb-4 border-b border-foreground/20 pb-2"}`}
    >
      <div className="h-3 w-1 bg-foreground" />
      <h3 className="font-mono text-xs font-bold uppercase tracking-widest">{title}</h3>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
  suffix,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  suffix?: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-none border border-foreground/20 bg-card p-4">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          {label}
        </span>
        <span className="text-muted-foreground">{icon}</span>
      </div>
      <div className="mt-3 font-mono text-3xl font-black leading-none">
        {value}
        {suffix ? <span className="text-base text-muted-foreground">{suffix}</span> : null}
      </div>
    </div>
  );
}

function Empty() {
  return (
    <div className="grid-bg flex flex-col items-center justify-center gap-3 p-12 text-center">
      <ScanLine className="h-8 w-8 text-muted-foreground" />
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        No analyses yet
      </p>
      <Link
        to="/analyze"
        className="border border-foreground bg-foreground px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest text-background hover:opacity-90"
      >
        Run First Analysis
      </Link>
    </div>
  );
}

function EmptyMini({ label }: { label: string }) {
  return (
    <div className="grid-bg flex h-64 items-center justify-center">
      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
    </div>
  );
}
