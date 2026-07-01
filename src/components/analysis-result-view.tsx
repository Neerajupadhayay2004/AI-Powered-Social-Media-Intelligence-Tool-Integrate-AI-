import type { AnalysisResult } from "@/lib/analysis-types";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { RiskBadge } from "@/components/risk-badge";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";
import {
  AlertTriangle,
  Shield,
  Target,
  Fingerprint,
  Brain,
  ListChecks,
} from "lucide-react";

interface Props {
  result: AnalysisResult;
  content: string;
}

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Card className="rounded-none border-foreground/20 bg-card p-5">
      <div className="mb-4 flex items-center gap-2 border-b border-foreground/20 pb-2">
        <div className="text-foreground">{icon}</div>
        <h3 className="font-mono text-xs font-bold uppercase tracking-widest">
          {title}
        </h3>
      </div>
      {children}
    </Card>
  );
}

function EntityList({ label, items }: { label: string; items: string[] }) {
  if (!items?.length) return null;
  return (
    <div>
      <div className="mb-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
      <div className="flex flex-wrap gap-1">
        {items.map((v, i) => (
          <Badge
            key={`${label}-${i}`}
            variant="outline"
            className="rounded-sm border-foreground/30 font-mono text-[11px]"
          >
            {v}
          </Badge>
        ))}
      </div>
    </div>
  );
}

export function AnalysisResultView({ result, content }: Props) {
  const emotionData = Object.entries(result.emotion_scores ?? {}).map(
    ([name, value]) => ({ name: name.slice(0, 3).toUpperCase(), value: Math.round(value * 100) }),
  );

  const scoreBars = [
    { name: "RISK", value: result.risk_score },
    { name: "SCAM", value: result.scam_probability },
    { name: "CONF", value: result.classification_confidence },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <Card className="rounded-none border-foreground/20 bg-card p-5">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:items-center sm:justify-between">
          <div className="min-w-0">
            <div className="mb-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Verdict
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="truncate text-2xl font-bold tracking-tight">
                {result.classification}
              </h2>
              <RiskBadge level={result.risk_level} />
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{result.summary}</p>
          </div>
          <div className="shrink-0 text-right">
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Risk Score
            </div>
            <div className="font-mono text-4xl font-black leading-none">
              {Math.round(result.risk_score)}
              <span className="text-lg text-muted-foreground">/100</span>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-4 lg:grid-cols-3">
        <Section title="Threat Profile" icon={<Shield className="h-4 w-4" />}>
          <div className="space-y-3 text-sm">
            <Row k="Category" v={result.threat_category} />
            <Row k="Scam Type" v={result.scam_type ?? "—"} />
            <Row k="Kill Chain" v={result.kill_chain_phase} />
            <Row k="Sentiment" v={`${result.sentiment} (${result.sentiment_score.toFixed(2)})`} />
            <Row k="Emotion" v={result.emotion} />
            <div className="space-y-2 pt-2">
              {scoreBars.map((b) => (
                <div key={b.name}>
                  <div className="mb-1 flex justify-between font-mono text-[10px] uppercase tracking-widest">
                    <span>{b.name}</span>
                    <span>{Math.round(b.value)}%</span>
                  </div>
                  <Progress value={b.value} className="h-1 rounded-none" />
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section title="Emotion Signal" icon={<Brain className="h-4 w-4" />}>
          <div className="h-52 w-full">
            <ResponsiveContainer>
              <RadarChart data={emotionData}>
                <PolarGrid stroke="var(--border)" />
                <PolarAngleAxis
                  dataKey="name"
                  tick={{ fill: "var(--muted-foreground)", fontSize: 10 }}
                />
                <Radar
                  dataKey="value"
                  stroke="var(--foreground)"
                  fill="var(--foreground)"
                  fillOpacity={0.25}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Section>

        <Section title="Score Matrix" icon={<Target className="h-4 w-4" />}>
          <div className="h-52 w-full">
            <ResponsiveContainer>
              <BarChart data={scoreBars} layout="vertical" margin={{ left: 8, right: 16 }}>
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fill: "var(--muted-foreground)", fontSize: 10 }}
                  width={40}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: "color-mix(in oklab, var(--foreground) 8%, transparent)" }}
                  contentStyle={{
                    background: "var(--background)",
                    border: "1px solid var(--border)",
                    borderRadius: 0,
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                  }}
                />
                <Bar dataKey="value">
                  {scoreBars.map((_, i) => (
                    <Cell key={i} fill="var(--foreground)" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Section>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Section title="AI Reasoning" icon={<Brain className="h-4 w-4" />}>
          <p className="whitespace-pre-wrap text-sm leading-relaxed">
            {result.explanation}
          </p>
          {result.keywords?.length ? (
            <div className="mt-4 flex flex-wrap gap-1">
              {result.keywords.map((k, i) => (
                <Badge
                  key={i}
                  variant="secondary"
                  className="rounded-sm border border-foreground/20 font-mono text-[11px]"
                >
                  #{k}
                </Badge>
              ))}
            </div>
          ) : null}
        </Section>

        <Section title="Scam Indicators" icon={<AlertTriangle className="h-4 w-4" />}>
          {result.scam_indicators?.length ? (
            <ul className="space-y-2 text-sm">
              {result.scam_indicators.map((s, i) => (
                <li key={i} className="flex gap-2 border-l-2 border-foreground/60 pl-3">
                  <span className="font-mono text-xs text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No scam indicators detected.</p>
          )}
          {result.mitre_techniques?.length ? (
            <div className="mt-4">
              <div className="mb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                MITRE ATT&CK
              </div>
              <div className="flex flex-wrap gap-1">
                {result.mitre_techniques.map((t, i) => (
                  <Badge
                    key={i}
                    variant="outline"
                    className="rounded-sm border-foreground/40 font-mono text-[11px]"
                  >
                    {t.id} · {t.name}
                  </Badge>
                ))}
              </div>
            </div>
          ) : null}
        </Section>
      </div>

      <Section title="Extracted Entities" icon={<Fingerprint className="h-4 w-4" />}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <EntityList label="Persons" items={result.entities?.persons ?? []} />
          <EntityList label="Organizations" items={result.entities?.organizations ?? []} />
          <EntityList label="Locations" items={result.entities?.locations ?? []} />
          <EntityList label="Emails" items={result.entities?.emails ?? []} />
          <EntityList label="Phones" items={result.entities?.phones ?? []} />
          <EntityList label="URLs" items={result.entities?.urls ?? []} />
          <EntityList label="Domains" items={result.entities?.domains ?? []} />
          <EntityList label="IPs" items={result.entities?.ips ?? []} />
          <EntityList label="Crypto Wallets" items={result.entities?.crypto_wallets ?? []} />
          <EntityList label="Hashtags" items={result.entities?.hashtags ?? []} />
          <EntityList label="Mentions" items={result.entities?.mentions ?? []} />
          <EntityList label="Dates" items={result.entities?.dates ?? []} />
          <EntityList label="Currencies" items={result.entities?.currencies ?? []} />
        </div>
      </Section>

      <Section title="Recommended Actions" icon={<ListChecks className="h-4 w-4" />}>
        {result.recommendations?.length ? (
          <ol className="space-y-2 text-sm">
            {result.recommendations.map((r, i) => (
              <li key={i} className="flex gap-3">
                <span className="font-mono text-xs font-bold text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{r}</span>
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-sm text-muted-foreground">No specific actions recommended.</p>
        )}
      </Section>

      <details className="rounded-none border border-foreground/20 bg-muted/30 p-4">
        <summary className="cursor-pointer font-mono text-xs uppercase tracking-widest">
          Analyzed Content
        </summary>
        <pre className="mt-3 whitespace-pre-wrap break-words font-mono text-xs text-muted-foreground">
          {content}
        </pre>
      </details>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-dashed border-foreground/15 pb-1">
      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {k}
      </span>
      <span className="truncate text-right font-mono text-xs">{v}</span>
    </div>
  );
}
