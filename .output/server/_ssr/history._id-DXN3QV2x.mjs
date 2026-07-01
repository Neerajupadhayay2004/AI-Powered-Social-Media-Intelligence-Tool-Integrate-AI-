import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { C as FileBraces, _ as ArrowLeft, h as Download, m as FileText } from "../_libs/lucide-react.mjs";
import { a as getById, t as AppShell } from "./history-store-CpLXu2WE.mjs";
import { t as AnalysisResultView } from "./analysis-result-view-B3vNBBgN.mjs";
import { t as Button } from "./button-CsoKkFFg.mjs";
import { t as Route } from "./history._id-Cu7cON9e.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/history._id-DXN3QV2x.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function download(name, data, mime) {
	const blob = new Blob([data], { type: mime });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = name;
	a.click();
	URL.revokeObjectURL(url);
}
function toCSV(entry) {
	const r = entry.result;
	return [
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
		["summary", r.summary]
	].map((r) => r.map((v) => `"${String(v).replace(/"/g, "\"\"")}"`).join(",")).join("\n");
}
function HistoryDetail() {
	const { id } = Route.useParams();
	const [entry, setEntry] = (0, import_react.useState)(void 0);
	(0, import_react.useEffect)(() => {
		setEntry(getById(id));
	}, [id]);
	if (!entry) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid-bg border border-foreground/20 p-16 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-mono text-xs uppercase tracking-widest text-muted-foreground",
			children: "Record not found."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/history",
			className: "mt-4 inline-flex items-center gap-2 border border-foreground bg-foreground px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest text-background",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Back to history"]
		})]
	}) });
	const base = `sentinel-${entry.id.slice(0, 8)}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-6 flex flex-wrap items-center gap-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/history",
				className: "inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3 w-3" }), " History"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground",
				children: [
					"/ #",
					entry.id.slice(0, 8),
					" · ",
					new Date(entry.createdAt).toLocaleString(),
					" · ",
					entry.source
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ml-auto flex gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "sm",
						className: "rounded-none border-foreground/30 font-mono text-[10px] uppercase tracking-widest",
						onClick: () => download(`${base}.json`, JSON.stringify(entry, null, 2), "application/json"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileBraces, { className: "mr-1 h-3 w-3" }), " JSON"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "sm",
						className: "rounded-none border-foreground/30 font-mono text-[10px] uppercase tracking-widest",
						onClick: () => download(`${base}.csv`, toCSV(entry), "text/csv"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "mr-1 h-3 w-3" }), " CSV"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						className: "rounded-none border border-foreground bg-foreground font-mono text-[10px] uppercase tracking-widest text-background",
						onClick: () => window.print(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "mr-1 h-3 w-3" }), " Print / PDF"]
					})
				]
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnalysisResultView, {
		result: entry.result,
		content: entry.content
	})] });
}
//#endregion
export { HistoryDetail as component };
