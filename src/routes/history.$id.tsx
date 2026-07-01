import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { AnalysisResultView } from "@/components/analysis-result-view";
import { getById } from "@/lib/history-store";
import type { StoredAnalysis } from "@/lib/analysis-types";
import { ArrowLeft, Download, FileJson, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/history/$id")({ component: HistoryDetail });

function download(name: string, data: string, mime: string) {
  const blob = new Blob([data], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}

function toCSV(entry: StoredAnalysis): string {
  const r = entry.result;
  const rows = [
    ["field", "value"],
    ["id", entry.id],
    ["created_at", new Date(entry.createdAt).toISOString()],
    ["source", entry.source],
    ["classification", r.classification],
    ["classification_confidence", String(r.classification_confidence)],
    ["sentiment", r.sentiment],
    ["emotion", r.emotion],
    ["scam_probability", String(r.scam_probability)],
    ["threat_category", r.threat_category],
    ["risk_score", String(r.risk_score)],
    ["risk_level", r.risk_level],
    ["kill_chain_phase", r.kill_chain_phase],
    ["keywords", r.keywords?.join("|") ?? ""],
    ["summary", r.summary],
  ];
  return rows.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\n");
}

function HistoryDetail() {
  const { id } = Route.useParams();
  const [entry, setEntry] = useState<StoredAnalysis | undefined>(undefined);

  useEffect(() => {
    setEntry(getById(id));
  }, [id]);

  if (!entry) {
    return (
      <AppShell>
        <div className="grid-bg border border-foreground/20 p-16 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Record not found.
          </p>
          <Link
            to="/history"
            className="mt-4 inline-flex items-center gap-2 border border-foreground bg-foreground px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest text-background"
          >
            <ArrowLeft className="h-4 w-4" /> Back to history
          </Link>
        </div>
      </AppShell>
    );
  }

  const base = `sentinel-${entry.id.slice(0, 8)}`;

  return (
    <AppShell>
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <Link
          to="/history"
          className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3 w-3" /> History
        </Link>
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          / #{entry.id.slice(0, 8)} · {new Date(entry.createdAt).toLocaleString()} · {entry.source}
        </span>
        <div className="ml-auto flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="rounded-none border-foreground/30 font-mono text-[10px] uppercase tracking-widest"
            onClick={() =>
              download(`${base}.json`, JSON.stringify(entry, null, 2), "application/json")
            }
          >
            <FileJson className="mr-1 h-3 w-3" /> JSON
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-none border-foreground/30 font-mono text-[10px] uppercase tracking-widest"
            onClick={() => download(`${base}.csv`, toCSV(entry), "text/csv")}
          >
            <FileText className="mr-1 h-3 w-3" /> CSV
          </Button>
          <Button
            size="sm"
            className="rounded-none border border-foreground bg-foreground font-mono text-[10px] uppercase tracking-widest text-background"
            onClick={() => window.print()}
          >
            <Download className="mr-1 h-3 w-3" /> Print / PDF
          </Button>
        </div>
      </div>

      <AnalysisResultView result={entry.result} content={entry.content} />
    </AppShell>
  );
}
