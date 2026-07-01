import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { P as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { S as LoaderCircle, c as ScanLine, l as Save, t as Trash2 } from "../_libs/lucide-react.mjs";
import { s as saveAnalysis, t as AppShell } from "./history-store-CpLXu2WE.mjs";
import { t as AnalysisResultView } from "./analysis-result-view-B3vNBBgN.mjs";
import { n as analyzeText, t as Textarea } from "./analyze.functions-DBh6dLCs.mjs";
import { t as Button } from "./button-CsoKkFFg.mjs";
import { t as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/analyze-pyUyu_tj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SOURCES = [
	"Tweet / X",
	"Reddit post",
	"Instagram caption",
	"Facebook post",
	"LinkedIn post",
	"YouTube comment",
	"Telegram / WhatsApp",
	"Email",
	"Other"
];
var SAMPLES = [
	{
		label: "Crypto scam DM",
		text: "🚀 URGENT! Only 3 spots left in our exclusive BTC doubling program. Send 0.1 BTC to bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh and receive 0.25 BTC in 24 hours guaranteed. DM @invest_guru_x now. This offer expires in 1 hour! #crypto #passive_income"
	},
	{
		label: "Phishing tweet",
		text: "Attention Netflix users: your account has been suspended due to failed payment. Verify billing information within 24 hours at netfIix-billing-secure.com to avoid cancellation. Reply STOP to opt out."
	},
	{
		label: "Neutral news",
		text: "The city council approved the new public transit expansion plan this morning, adding two new bus routes and extending metro service hours starting next quarter."
	}
];
function AnalyzePage() {
	const [content, setContent] = (0, import_react.useState)("");
	const [source, setSource] = (0, import_react.useState)(SOURCES[0]);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [result, setResult] = (0, import_react.useState)(null);
	const [savedId, setSavedId] = (0, import_react.useState)(null);
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
			const r = await analyzeText({ data: {
				content,
				source
			} });
			setResult(r);
			setSavedId(saveAnalysis({
				source,
				content,
				result: r
			}).id);
			toast.success("Analysis complete");
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Analysis failed");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground",
					children: "// Content Ingest"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 text-3xl font-black tracking-tight sm:text-4xl",
					children: "Analyze Content"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Paste any public social media post, comment, or message. Sentinel AI classifies threats, extracts entities and explains its reasoning."
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border border-foreground/20 bg-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 border-b border-foreground/20 px-4 py-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2 w-2 animate-pulse rounded-full bg-foreground" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground",
								children: [
									"INPUT_STREAM · ",
									content.length,
									" chars"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => {
									setContent("");
									setResult(null);
								},
								className: "ml-auto flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3 w-3" }), " Clear"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						value: content,
						onChange: (e) => setContent(e.target.value),
						placeholder: "Paste public content here...\n\ne.g. tweet, Reddit post, comment, message, caption",
						rows: 12,
						className: "rounded-none border-0 bg-transparent font-mono text-sm focus-visible:ring-0",
						maxLength: 1e4
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2 border-t border-foreground/20 p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: source,
							onChange: (e) => setSource(e.target.value),
							className: "border border-foreground/30 bg-background px-2 py-1.5 font-mono text-xs",
							children: SOURCES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: s }, s))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: run,
							disabled: loading,
							className: "ml-auto rounded-none border border-foreground bg-foreground font-mono text-xs font-bold uppercase tracking-widest text-background hover:opacity-90",
							children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }), " Analyzing"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScanLine, { className: "mr-2 h-4 w-4" }), " Run Analysis"] })
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border border-foreground/20 bg-card p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-1 bg-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-mono text-xs font-bold uppercase tracking-widest",
							children: "Sample Payloads"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-2",
						children: SAMPLES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setContent(s.text),
							className: "w-full border border-foreground/20 p-2 text-left font-mono text-[11px] hover:bg-accent",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "font-bold uppercase tracking-widest text-muted-foreground",
								children: ["→ ", s.label]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 line-clamp-2 normal-case text-foreground/80",
								children: s.text
							})]
						}) }, s.label))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border border-foreground/20 bg-muted/40 p-4 font-mono text-[10px] leading-relaxed uppercase tracking-widest text-muted-foreground",
					children: "⚠ Ethics: only submit content that is publicly available or was shared with your consent. No scraping. No ToS violations."
				})]
			})]
		}),
		loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 grid gap-3",
			children: [
				0,
				1,
				2
			].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "scanline h-24 border border-foreground/20 bg-card" }, i))
		}),
		result && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground",
					children: ["// Report ", savedId ? `#${savedId.slice(0, 8)}` : ""]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-3 w-3" }),
						" Saved to history",
						savedId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => navigate({
								to: "/history/$id",
								params: { id: savedId }
							}),
							className: "ml-2 border border-foreground/30 px-2 py-0.5 hover:bg-accent",
							children: "Open →"
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnalysisResultView, {
				result,
				content
			})]
		})
	] });
}
//#endregion
export { AnalyzePage as component };
