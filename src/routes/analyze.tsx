import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { AnalysisResultView } from "@/components/analysis-result-view";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { analyzeText } from "@/lib/analyze.functions";
import { saveAnalysis } from "@/lib/history-store";
import type { AnalysisResult } from "@/lib/analysis-types";
import { toast } from "sonner";
import { Loader2, ScanLine, Save, Trash2 } from "lucide-react";

export const Route = createFileRoute("/analyze")({ component: AnalyzePage });

const SOURCES = [
  "Tweet / X",
  "Reddit post",
  "Instagram caption",
  "Facebook post",
  "LinkedIn post",
  "YouTube comment",
  "Telegram / WhatsApp",
  "Email",
  "Other",
];

const SAMPLES = [
  {
    label: "Crypto scam DM",
    text: "🚀 URGENT! Only 3 spots left in our exclusive BTC doubling program. Send 0.1 BTC to bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh and receive 0.25 BTC in 24 hours guaranteed. DM @invest_guru_x now. This offer expires in 1 hour! #crypto #passive_income",
  },
  {
    label: "Phishing tweet",
    text: "Attention Netflix users: your account has been suspended due to failed payment. Verify billing information within 24 hours at netfIix-billing-secure.com to avoid cancellation. Reply STOP to opt out.",
  },
  {
    label: "Neutral news",
    text: "The city council approved the new public transit expansion plan this morning, adding two new bus routes and extending metro service hours starting next quarter.",
  },
];

function AnalyzePage() {
  const [content, setContent] = useState("");
  const [source, setSource] = useState(SOURCES[0]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [savedId, setSavedId] = useState<string | null>(null);
  const navigate = useNavigate();

  const run = async () => {
    if (content.trim().length < 3) {
      toast.error("Enter content to analyze.");
      return;
    }
    setLoading(true);
    setResult(null);
    setSavedId(null);
    try {
      const r = await analyzeText({ data: { content, source } });
      setResult(r as AnalysisResult);
      const saved = saveAnalysis({ source, content, result: r as AnalysisResult });
      setSavedId(saved.id);
      toast.success("Analysis complete");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Analysis failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell>
      <div className="mb-6">
        <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          // Content Ingest
        </div>
        <h1 className="mt-1 text-3xl font-black tracking-tight sm:text-4xl">Analyze Content</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Paste any public social media post, comment, or message. Sentinel AI classifies threats, extracts entities and explains its reasoning.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="border border-foreground/20 bg-card">
          <div className="flex items-center gap-2 border-b border-foreground/20 px-4 py-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-foreground" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              INPUT_STREAM · {content.length} chars
            </span>
            <button
              onClick={() => {
                setContent("");
                setResult(null);
              }}
              className="ml-auto flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground"
            >
              <Trash2 className="h-3 w-3" /> Clear
            </button>
          </div>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={"Paste public content here...\n\ne.g. tweet, Reddit post, comment, message, caption"}
            rows={12}
            className="rounded-none border-0 bg-transparent font-mono text-sm focus-visible:ring-0"
            maxLength={10000}
          />
          <div className="flex flex-wrap items-center gap-2 border-t border-foreground/20 p-3">
            <select
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="border border-foreground/30 bg-background px-2 py-1.5 font-mono text-xs"
            >
              {SOURCES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <Button
              onClick={run}
              disabled={loading}
              className="ml-auto rounded-none border border-foreground bg-foreground font-mono text-xs font-bold uppercase tracking-widest text-background hover:opacity-90"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing
                </>
              ) : (
                <>
                  <ScanLine className="mr-2 h-4 w-4" /> Run Analysis
                </>
              )}
            </Button>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="border border-foreground/20 bg-card p-4">
            <div className="mb-3 flex items-center gap-2">
              <div className="h-3 w-1 bg-foreground" />
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest">Sample Payloads</h3>
            </div>
            <ul className="space-y-2">
              {SAMPLES.map((s) => (
                <li key={s.label}>
                  <button
                    onClick={() => setContent(s.text)}
                    className="w-full border border-foreground/20 p-2 text-left font-mono text-[11px] hover:bg-accent"
                  >
                    <div className="font-bold uppercase tracking-widest text-muted-foreground">
                      → {s.label}
                    </div>
                    <div className="mt-1 line-clamp-2 normal-case text-foreground/80">
                      {s.text}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-foreground/20 bg-muted/40 p-4 font-mono text-[10px] leading-relaxed uppercase tracking-widest text-muted-foreground">
            ⚠ Ethics: only submit content that is publicly available or was shared with your consent. No scraping. No ToS violations.
          </div>
        </aside>
      </div>

      {loading && (
        <div className="mt-6 grid gap-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="scanline h-24 border border-foreground/20 bg-card" />
          ))}
        </div>
      )}

      {result && (
        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              // Report {savedId ? `#${savedId.slice(0, 8)}` : ""}
            </div>
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              <Save className="h-3 w-3" /> Saved to history
              {savedId && (
                <button
                  onClick={() => navigate({ to: "/history/$id", params: { id: savedId } })}
                  className="ml-2 border border-foreground/30 px-2 py-0.5 hover:bg-accent"
                >
                  Open →
                </button>
              )}
            </div>
          </div>
          <AnalysisResultView result={result} content={content} />
        </div>
      )}
    </AppShell>
  );
}
