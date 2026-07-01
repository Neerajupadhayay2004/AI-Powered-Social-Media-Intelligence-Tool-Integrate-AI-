export interface AnalysisResult {
  classification: string;
  classification_confidence: number;
  sentiment: string;
  sentiment_score: number;
  emotion: string;
  emotion_scores: Record<string, number>;
  scam_probability: number;
  scam_type: string | null;
  scam_indicators: string[];
  threat_category: string;
  risk_score: number;
  risk_level: "Low" | "Medium" | "High" | "Critical" | string;
  mitre_techniques: Array<{ id: string; name: string }>;
  kill_chain_phase: string;
  entities: {
    persons: string[];
    organizations: string[];
    locations: string[];
    emails: string[];
    phones: string[];
    urls: string[];
    ips: string[];
    domains: string[];
    crypto_wallets: string[];
    hashtags: string[];
    mentions: string[];
    dates: string[];
    currencies: string[];
  };
  keywords: string[];
  summary: string;
  explanation: string;
  recommendations: string[];
}

export interface StoredAnalysis {
  id: string;
  createdAt: number;
  source: string;
  content: string;
  result: AnalysisResult;
}
