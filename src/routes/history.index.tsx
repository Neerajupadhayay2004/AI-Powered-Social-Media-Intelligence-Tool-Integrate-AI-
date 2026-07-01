import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { RiskBadge } from "@/components/risk-badge";
import { clearHistory, deleteAnalysis, loadHistory } from "@/lib/history-store";
import type { StoredAnalysis } from "@/lib/analysis-types";
import { Input } from "@/components/ui/input";
import { Search, Trash2 } from "lucide-react";

export const Route = createFileRoute("/history/")({ component: HistoryList });

function HistoryList() {
  const [list, setList] = useState<StoredAnalysis[]>([]);
  const [q, setQ] = useState("");
  const [risk, setRisk] = useState<string>("All");

  useEffect(() => {
    const sync = () => setList(loadHistory());
    sync();
    window.addEventListener("sentinel:history", sync);
    return () => window.removeEventListener("sentinel:history", sync);
  }, []);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return list.filter((h) => {
      if (risk !== "All" && h.result.risk_level !== risk) return false;
      if (!term) return true;
      return (
        h.content.toLowerCase().includes(term) ||
        h.result.classification?.toLowerCase().includes(term) ||
        h.result.threat_category?.toLowerCase().includes(term) ||
        h.result.keywords?.some((k) => k.toLowerCase().includes(term)) ||
        Object.values(h.result.entities ?? {}).some((arr) =>
          (arr as string[])?.some?.((v) => v.toLowerCase().includes(term)),
        )
      );
    });
  }, [list, q, risk]);

  return (
    <AppShell>
      <div className="mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
        <div className="min-w-0">
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            // Investigation Archive
          </div>
          <h1 className="mt-1 truncate text-3xl font-black tracking-tight sm:text-4xl">History</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {list.length} analyses stored locally on this device.
          </p>
        </div>
        {list.length > 0 && (
          <button
            onClick={() => {
              if (confirm("Delete all history?")) clearHistory();
            }}
            className="shrink-0 border border-foreground/40 px-3 py-2 font-mono text-[10px] uppercase tracking-widest hover:bg-accent"
          >
            <Trash2 className="mr-1 inline h-3 w-3" /> Clear
          </button>
        )}
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2 border border-foreground/20 bg-card p-3">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search content, entities, keywords, categories..."
          className="min-w-[220px] flex-1 rounded-none border-0 bg-transparent font-mono text-sm focus-visible:ring-0"
        />
        <select
          value={risk}
          onChange={(e) => setRisk(e.target.value)}
          className="border border-foreground/30 bg-background px-2 py-1.5 font-mono text-xs"
        >
          {["All", "Low", "Medium", "High", "Critical"].map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="grid-bg border border-foreground/20 p-16 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            No records match.
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-foreground/10 border border-foreground/20 bg-card">
          {filtered.map((h) => (
            <li key={h.id} className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 p-4 hover:bg-accent">
              <Link to="/history/$id" params={{ id: h.id }} className="min-w-0">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <RiskBadge level={h.result.risk_level} />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {h.result.classification} · {h.result.threat_category}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    · {new Date(h.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className="line-clamp-2 text-sm">{h.content}</p>
              </Link>
              <button
                onClick={() => deleteAnalysis(h.id)}
                aria-label="Delete"
                className="shrink-0 border border-transparent p-2 text-muted-foreground opacity-0 hover:border-foreground/30 hover:text-foreground group-hover:opacity-100"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </AppShell>
  );
}
