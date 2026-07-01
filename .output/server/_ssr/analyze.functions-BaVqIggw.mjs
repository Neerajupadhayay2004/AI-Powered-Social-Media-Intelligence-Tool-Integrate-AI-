import { i as TSS_SERVER_FUNCTION, l as createServerFn } from "./esm-Dova13aH.mjs";
import { i as stringType, n as enumType, r as objectType, t as arrayType } from "../_libs/zod.mjs";
import process from "node:process";
//#region node_modules/.nitro/vite/services/ssr/assets/analyze.functions-BaVqIggw.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var GATEWAY_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";
async function callGateway(opts) {
	const key = process.env.LOVABLE_API_KEY;
	if (!key) throw new Error("Missing LOVABLE_API_KEY");
	const res = await fetch(GATEWAY_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Lovable-API-Key": key
		},
		body: JSON.stringify({
			model: opts.model ?? "google/gemini-3-flash-preview",
			messages: opts.messages,
			...opts.response_format ? { response_format: opts.response_format } : {},
			...opts.temperature !== void 0 ? { temperature: opts.temperature } : {}
		})
	});
	if (res.status === 429) throw new Error("Rate limit exceeded. Try again shortly.");
	if (res.status === 402) throw new Error("AI credits exhausted. Add credits in workspace billing.");
	if (!res.ok) {
		const text = await res.text().catch(() => "");
		throw new Error(`AI Gateway error ${res.status}: ${text.slice(0, 300)}`);
	}
	return (await res.json()).choices?.[0]?.message?.content ?? "";
}
var AnalyzeInput = objectType({
	content: stringType().trim().min(1).max(1e4),
	source: stringType().max(60).optional()
});
var SYSTEM_PROMPT = `You are Sentinel AI, a senior cyber threat intelligence analyst specialized in social media OSINT.
Analyze the user-provided public content and return ONLY a single JSON object matching this schema (no prose, no markdown):

{
  "classification": one of ["News","Promotion","Advertisement","Cybercrime","Political","Religious","Technology","Finance","Education","Entertainment","Adult","Violence","Spam","Scam","Malware","Ransomware","Phishing","Crypto","Recruitment","Marketplace","Other"],
  "classification_confidence": number 0-100,
  "sentiment": one of ["Positive","Negative","Neutral"],
  "sentiment_score": number -1 to 1,
  "emotion": one of ["Joy","Trust","Fear","Sadness","Anger","Disgust","Surprise","Neutral"],
  "emotion_scores": { "joy": 0-1, "trust": 0-1, "fear": 0-1, "sadness": 0-1, "anger": 0-1, "disgust": 0-1, "surprise": 0-1, "neutral": 0-1 },
  "scam_probability": number 0-100,
  "scam_type": string | null,
  "scam_indicators": string[],
  "threat_category": one of ["None","Malware","Phishing","Credential Theft","Identity Theft","Social Engineering","Cyberbullying","Harassment","Extremism","Violence","Financial Fraud","Brand Impersonation","Spam","Misinformation","Other"],
  "risk_score": number 0-100,
  "risk_level": one of ["Low","Medium","High","Critical"],
  "mitre_techniques": [{ "id": "T####", "name": string }],
  "kill_chain_phase": one of ["Reconnaissance","Weaponization","Delivery","Exploitation","Installation","Command & Control","Actions on Objectives","N/A"],
  "entities": {
    "persons": string[], "organizations": string[], "locations": string[],
    "emails": string[], "phones": string[], "urls": string[], "ips": string[],
    "domains": string[], "crypto_wallets": string[], "hashtags": string[],
    "mentions": string[], "dates": string[], "currencies": string[]
  },
  "keywords": string[],
  "summary": string (2-3 sentences),
  "explanation": string (why the model reached this verdict, cite evidence),
  "recommendations": string[] (defender / investigator actions)
}

Rules:
- Base findings only on the provided text. Do not invent entities.
- If nothing malicious, use classification "News"/"Other", risk_level "Low", threat_category "None".
- Return valid JSON only.`;
function extractEntities(text) {
	const emailRegex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi;
	const urlRegex = /https?:\/\/[^\s]+/gi;
	const phoneRegex = /\+?\d[\d\s().-]{7,}\d/g;
	const mentionRegex = /@([A-Za-z0-9_]+)/g;
	const hashtagRegex = /#([A-Za-z0-9_]+)/g;
	const dateRegex = /\b\d{4}-\d{2}-\d{2}\b|\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{1,2},?\s+\d{4}\b/gi;
	const currencyRegex = /\b(?:USD|EUR|GBP|BTC|ETH|USDT|JPY|CAD|AUD)\b/gi;
	const urls = text.match(urlRegex) ?? [];
	const domains = urls.map((url) => {
		try {
			return new URL(url).hostname.replace(/^www\./i, "");
		} catch {
			return null;
		}
	}).filter((domain) => Boolean(domain));
	return {
		persons: [],
		organizations: [],
		locations: [],
		emails: text.match(emailRegex) ?? [],
		phones: text.match(phoneRegex) ?? [],
		urls,
		ips: [],
		domains,
		crypto_wallets: text.match(/\b(?:bc1|0x)[A-Za-z0-9]+\b/g) ?? [],
		hashtags: text.match(hashtagRegex) ?? [],
		mentions: text.match(mentionRegex) ?? [],
		dates: text.match(dateRegex) ?? [],
		currencies: text.match(currencyRegex) ?? []
	};
}
function buildLocalAnalysis(content, source) {
	const normalized = content.toLowerCase();
	const matchedTerms = [
		"urgent",
		"guaranteed",
		"double",
		"bitcoin",
		"btc",
		"crypto",
		"verify",
		"password",
		"login",
		"suspended",
		"limited time",
		"act now",
		"click here",
		"free money",
		"investment",
		"wallet",
		"send"
	].filter((term) => normalized.includes(term));
	const urgentSignal = /urgent|immediately|act now|limited time|expires|guaranteed|winner|free gift/i.test(content);
	const scamSignal = /scam|fraud|phish|verify|password|login|suspended|wallet|send|bitcoin|btc|crypto|investment/i.test(content);
	const isLikelyScam = matchedTerms.length > 0 || urgentSignal || scamSignal;
	const classification = isLikelyScam ? "Scam" : /news|announced|official|reported|policy|election|released/i.test(content) ? "News" : "Other";
	const scamProbability = Math.min(100, 20 + matchedTerms.length * 12 + (urgentSignal ? 15 : 0) + (scamSignal ? 10 : 0));
	const riskScore = Math.min(100, scamProbability + (classification === "Scam" ? 8 : 0));
	const riskLevel = riskScore >= 80 ? "Critical" : riskScore >= 60 ? "High" : riskScore >= 35 ? "Medium" : "Low";
	const threatCategory = isLikelyScam ? normalized.includes("password") || normalized.includes("login") ? "Credential Theft" : "Financial Fraud" : "None";
	const sentiment = /thank|great|love|happy|good|excited|win|safe|secure/i.test(content) ? "Positive" : /bad|scam|fraud|angry|hate|danger|threat|suspicious|urgent|fake|fake/i.test(content) ? "Negative" : "Neutral";
	const sentimentScore = sentiment === "Positive" ? .4 : sentiment === "Negative" ? -.6 : 0;
	const emotion = sentiment === "Negative" ? "Fear" : sentiment === "Positive" ? "Joy" : "Neutral";
	const emotionScores = {
		joy: sentiment === "Positive" ? .6 : .1,
		trust: isLikelyScam ? .1 : .3,
		fear: isLikelyScam ? .7 : .2,
		sadness: .1,
		anger: isLikelyScam ? .5 : .1,
		disgust: isLikelyScam ? .6 : .1,
		surprise: urgentSignal ? .4 : .2,
		neutral: sentiment === "Neutral" ? .7 : .1
	};
	const entities = extractEntities(content);
	const keywords = Array.from(/* @__PURE__ */ new Set([...matchedTerms.length ? matchedTerms : [], ...content.split(/\s+/).filter((word) => word.length > 4).slice(0, 8)]));
	return {
		classification,
		classification_confidence: Math.max(55, Math.min(95, 65 + matchedTerms.length * 5 + (urgentSignal ? 8 : 0))),
		sentiment,
		sentiment_score: sentimentScore,
		emotion,
		emotion_scores: emotionScores,
		scam_probability: scamProbability,
		scam_type: isLikelyScam ? scamSignal ? "Fraud / Scam" : "Urgent solicitation" : null,
		scam_indicators: matchedTerms.length ? matchedTerms : ["No obvious scam indicators detected"],
		threat_category: threatCategory,
		risk_score: riskScore,
		risk_level: riskLevel,
		mitre_techniques: [{
			id: "T1566",
			name: "Phishing"
		}],
		kill_chain_phase: isLikelyScam ? "Delivery" : "N/A",
		entities,
		keywords: keywords.slice(0, 10),
		summary: `The content from ${source} appears ${isLikelyScam ? "suspicious and potentially deceptive" : "mostly benign"}. The analysis is based on explicit wording patterns and observable indicators in the submitted text.`,
		explanation: `The fallback analyzer flagged ${isLikelyScam ? "urgent or coercive language and suspicious financial or credential-related cues" : "mostly ordinary language with no clear malicious signals"}. This verdict is derived from the provided content only and should be treated as a heuristic assessment.`,
		recommendations: isLikelyScam ? [
			"Verify the sender or source before acting.",
			"Do not click links or send funds without independent confirmation.",
			"Report or block the content if it appears deceptive."
		] : ["Monitor the content for follow-up context.", "Keep the source and evidence trail documented."]
	};
}
var analyzeText_createServerFn_handler = createServerRpc({
	id: "dd7332aaaacbf6f0673e96af347dde2d543c0a0b8c2e8037bc875f7ca5759b43",
	name: "analyzeText",
	filename: "src/lib/analyze.functions.ts"
}, (opts) => analyzeText.__executeServer(opts));
var analyzeText = createServerFn({ method: "POST" }).inputValidator((d) => AnalyzeInput.parse(d)).handler(analyzeText_createServerFn_handler, async ({ data }) => {
	let raw;
	try {
		raw = await callGateway({
			response_format: { type: "json_object" },
			temperature: .2,
			messages: [{
				role: "system",
				content: SYSTEM_PROMPT
			}, {
				role: "user",
				content: `Source: ${data.source ?? "unknown"}\n---\n${data.content}`
			}]
		});
	} catch (error) {
		console.warn("AI gateway unavailable, using local analysis fallback", error);
		return buildLocalAnalysis(data.content, data.source ?? "unknown");
	}
	let parsed;
	try {
		parsed = JSON.parse(raw);
	} catch {
		const m = raw.match(/\{[\s\S]*\}/);
		if (!m) {
			console.warn("AI gateway returned non-JSON output, using local analysis fallback");
			return buildLocalAnalysis(data.content, data.source ?? "unknown");
		}
		parsed = JSON.parse(m[0]);
	}
	return parsed;
});
var ChatInput = objectType({
	messages: arrayType(objectType({
		role: enumType(["user", "assistant"]),
		content: stringType().min(1).max(4e3)
	})).min(1).max(30),
	context: stringType().max(2e4).optional()
});
var chatAssistant_createServerFn_handler = createServerRpc({
	id: "6f2e6da1549e19f4e7e47aa7c608d82687d89eb6bc670aeb2e244aa10e58c8d2",
	name: "chatAssistant",
	filename: "src/lib/analyze.functions.ts"
}, (opts) => chatAssistant.__executeServer(opts));
var chatAssistant = createServerFn({ method: "POST" }).inputValidator((d) => ChatInput.parse(d)).handler(chatAssistant_createServerFn_handler, async ({ data }) => {
	return { reply: await callGateway({
		temperature: .4,
		messages: [{
			role: "system",
			content: `You are Sentinel AI's Investigator Assistant — a concise cyber threat intelligence analyst.
Help the user interpret social media content: summarize, explain risk, list indicators, map to MITRE ATT&CK when relevant.
Be direct, use short paragraphs and bullet points. Never fabricate evidence.${data.context ? `\n\nInvestigation context / current analysis JSON:\n${data.context}` : ""}`
		}, ...data.messages]
	}) };
});
//#endregion
export { analyzeText_createServerFn_handler, chatAssistant_createServerFn_handler };
