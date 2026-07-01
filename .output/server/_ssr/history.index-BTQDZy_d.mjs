import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { s as Search, t as Trash2 } from "../_libs/lucide-react.mjs";
import { i as deleteAnalysis, n as clearHistory, o as loadHistory, r as cn, t as AppShell } from "./history-store-CpLXu2WE.mjs";
import { t as RiskBadge } from "./risk-badge-CgooZWJk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/history.index-BTQDZy_d.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
function HistoryList() {
	const [list, setList] = (0, import_react.useState)([]);
	const [q, setQ] = (0, import_react.useState)("");
	const [risk, setRisk] = (0, import_react.useState)("All");
	(0, import_react.useEffect)(() => {
		const sync = () => setList(loadHistory());
		sync();
		window.addEventListener("sentinel:history", sync);
		return () => window.removeEventListener("sentinel:history", sync);
	}, []);
	const filtered = (0, import_react.useMemo)(() => {
		const term = q.trim().toLowerCase();
		return list.filter((h) => {
			if (risk !== "All" && h.result.risk_level !== risk) return false;
			if (!term) return true;
			return h.content.toLowerCase().includes(term) || h.result.classification?.toLowerCase().includes(term) || h.result.threat_category?.toLowerCase().includes(term) || h.result.keywords?.some((k) => k.toLowerCase().includes(term)) || Object.values(h.result.entities ?? {}).some((arr) => arr?.some?.((v) => v.toLowerCase().includes(term)));
		});
	}, [
		list,
		q,
		risk
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground",
						children: "// Investigation Archive"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-1 truncate text-3xl font-black tracking-tight sm:text-4xl",
						children: "History"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: [list.length, " analyses stored locally on this device."]
					})
				]
			}), list.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => {
					if (confirm("Delete all history?")) clearHistory();
				},
				className: "shrink-0 border border-foreground/40 px-3 py-2 font-mono text-[10px] uppercase tracking-widest hover:bg-accent",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "mr-1 inline h-3 w-3" }), " Clear"]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex flex-wrap items-center gap-2 border border-foreground/20 bg-card p-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4 text-muted-foreground" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: q,
					onChange: (e) => setQ(e.target.value),
					placeholder: "Search content, entities, keywords, categories...",
					className: "min-w-[220px] flex-1 rounded-none border-0 bg-transparent font-mono text-sm focus-visible:ring-0"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					value: risk,
					onChange: (e) => setRisk(e.target.value),
					className: "border border-foreground/30 bg-background px-2 py-1.5 font-mono text-xs",
					children: [
						"All",
						"Low",
						"Medium",
						"High",
						"Critical"
					].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: r }, r))
				})
			]
		}),
		filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid-bg border border-foreground/20 p-16 text-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs uppercase tracking-widest text-muted-foreground",
				children: "No records match."
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "divide-y divide-foreground/10 border border-foreground/20 bg-card",
			children: filtered.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 p-4 hover:bg-accent",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/history/$id",
					params: { id: h.id },
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-1 flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RiskBadge, { level: h.result.risk_level }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground",
								children: [
									h.result.classification,
									" · ",
									h.result.threat_category
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground",
								children: ["· ", new Date(h.createdAt).toLocaleString()]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "line-clamp-2 text-sm",
						children: h.content
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => deleteAnalysis(h.id),
					"aria-label": "Delete",
					className: "shrink-0 border border-transparent p-2 text-muted-foreground opacity-0 hover:border-foreground/30 hover:text-foreground group-hover:opacity-100",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
				})]
			}, h.id))
		})
	] });
}
//#endregion
export { HistoryList as component };
