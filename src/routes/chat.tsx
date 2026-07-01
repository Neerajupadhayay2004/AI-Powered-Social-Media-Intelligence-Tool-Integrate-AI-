import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { chatAssistant } from "@/lib/analyze.functions";
import { loadHistory } from "@/lib/history-store";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Send, Sparkles, Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { StoredAnalysis } from "@/lib/analysis-types";

export const Route = createFileRoute("/chat")({ component: ChatPage });

interface Msg {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "Summarize the most recent analysis in plain English.",
  "Which posts in my history look like coordinated scam campaigns?",
  "What MITRE ATT&CK techniques appear in my latest analysis?",
  "Draft an investigator note for the highest-risk item.",
];

function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [ctxAll, setCtxAll] = useState(false);
  const [history, setHistory] = useState<StoredAnalysis[]>([]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content) return;
    const next: Msg[] = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const context = ctxAll
        ? JSON.stringify(history.slice(0, 10).map((h) => ({ createdAt: h.createdAt, source: h.source, result: h.result, snippet: h.content.slice(0, 400) })), null, 2)
        : history[0]
          ? JSON.stringify({ latest: history[0].result, snippet: history[0].content.slice(0, 600) }, null, 2)
          : undefined;
      const { reply } = await chatAssistant({ data: { messages: next, context } });
      setMessages([...next, { role: "assistant", content: reply }]);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Chat failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell>
      <div className="mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
        <div className="min-w-0">
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            // Investigator Assistant
          </div>
          <h1 className="mt-1 truncate text-3xl font-black tracking-tight sm:text-4xl">
            Sentinel Copilot
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Ask about your analyses. The assistant sees your most recent report as context.
          </p>
        </div>
        <button
          onClick={() => setMessages([])}
          className="shrink-0 border border-foreground/40 px-3 py-2 font-mono text-[10px] uppercase tracking-widest hover:bg-accent"
        >
          <Trash2 className="mr-1 inline h-3 w-3" /> Reset
        </button>
      </div>

      <div className="border border-foreground/20 bg-card">
        <div className="flex items-center gap-2 border-b border-foreground/20 px-4 py-2">
          <Sparkles className="h-3.5 w-3.5" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Session · {messages.length} messages · context: {history.length ? (ctxAll ? "last 10" : "latest") : "empty"}
          </span>
          <label className="ml-auto flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            <input
              type="checkbox"
              checked={ctxAll}
              onChange={(e) => setCtxAll(e.target.checked)}
              className="accent-foreground"
            />
            Include last 10
          </label>
        </div>

        <div className="max-h-[55vh] min-h-[320px] space-y-4 overflow-y-auto p-4">
          {messages.length === 0 && (
            <div className="grid-bg -m-4 flex flex-col items-center justify-center gap-4 p-10 text-center">
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Start a conversation
              </p>
              <div className="flex max-w-2xl flex-wrap justify-center gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="border border-foreground/30 bg-background px-3 py-2 text-left font-mono text-[11px] hover:bg-accent"
                  >
                    → {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] whitespace-pre-wrap border p-3 font-mono text-sm leading-relaxed ${
                  m.role === "user"
                    ? "border-foreground bg-foreground text-background"
                    : "border-foreground/20 bg-background"
                }`}
              >
                <div className="mb-1 text-[9px] uppercase tracking-widest opacity-60">
                  {m.role === "user" ? "You" : "Sentinel"}
                </div>
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="border border-foreground/20 bg-background p-3 font-mono text-xs text-muted-foreground">
                <Loader2 className="mr-2 inline h-3 w-3 animate-spin" /> thinking…
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        <div className="flex items-end gap-2 border-t border-foreground/20 p-3">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            placeholder="Ask the analyst… (Enter to send, Shift+Enter for newline)"
            rows={2}
            className="min-h-[3rem] flex-1 rounded-none border-foreground/30 bg-background font-mono text-sm"
            maxLength={4000}
          />
          <Button
            onClick={() => send()}
            disabled={loading || !input.trim()}
            className="rounded-none border border-foreground bg-foreground font-mono text-xs font-bold uppercase tracking-widest text-background hover:opacity-90"
          >
            <Send className="mr-1 h-4 w-4" /> Send
          </Button>
        </div>
      </div>
    </AppShell>
  );
}
