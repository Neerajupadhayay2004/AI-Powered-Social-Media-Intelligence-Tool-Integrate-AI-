import type { AnalysisResult, StoredAnalysis } from "./analysis-types";

const KEY = "sentinel-ai-history-v1";

export function loadHistory(): StoredAnalysis[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw) as StoredAnalysis[];
  } catch {
    return [];
  }
}

export function saveAnalysis(a: {
  source: string;
  content: string;
  result: AnalysisResult;
}): StoredAnalysis {
  const entry: StoredAnalysis = {
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    source: a.source,
    content: a.content,
    result: a.result,
  };
  const list = [entry, ...loadHistory()].slice(0, 200);
  window.localStorage.setItem(KEY, JSON.stringify(list));
  window.dispatchEvent(new CustomEvent("sentinel:history"));
  return entry;
}

export function deleteAnalysis(id: string) {
  const list = loadHistory().filter((x) => x.id !== id);
  window.localStorage.setItem(KEY, JSON.stringify(list));
  window.dispatchEvent(new CustomEvent("sentinel:history"));
}

export function clearHistory() {
  window.localStorage.removeItem(KEY);
  window.dispatchEvent(new CustomEvent("sentinel:history"));
}

export function getById(id: string): StoredAnalysis | undefined {
  return loadHistory().find((x) => x.id === id);
}
