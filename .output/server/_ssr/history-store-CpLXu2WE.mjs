import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { c as ScanLine, d as MessageSquare, i as Shield, r as Sun, s as Search, u as Moon, v as Activity } from "../_libs/lucide-react.mjs";
import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/history-store-CpLXu2WE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var nav = [
	{
		to: "/",
		label: "Dashboard",
		icon: Activity
	},
	{
		to: "/analyze",
		label: "Analyze",
		icon: ScanLine
	},
	{
		to: "/history",
		label: "History",
		icon: Search
	},
	{
		to: "/chat",
		label: "Assistant",
		icon: MessageSquare
	}
];
function AppShell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [dark, setDark] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const stored = localStorage.getItem("sentinel-theme");
		const isDark = stored ? stored === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
		document.documentElement.classList.toggle("dark", isDark);
		setDark(isDark);
	}, []);
	const toggleTheme = () => {
		const next = !dark;
		setDark(next);
		document.documentElement.classList.toggle("dark", next);
		localStorage.setItem("sentinel-theme", next ? "dark" : "light");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-screen w-full flex-col bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-40 border-b border-foreground/20 bg-background/95 backdrop-blur",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex h-14 max-w-7xl items-center gap-4 px-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-8 w-8 shrink-0 place-items-center border border-foreground bg-foreground text-background",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-4 w-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "font-mono text-sm font-bold leading-none tracking-tight",
									children: ["SENTINEL", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "/AI"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-0.5 hidden font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:block",
									children: "Social Media Intelligence"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "ml-auto hidden items-center gap-1 md:flex",
							children: nav.map((n) => {
								const active = pathname === n.to;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: n.to,
									className: cn("flex items-center gap-2 border border-transparent px-3 py-1.5 font-mono text-xs uppercase tracking-widest transition-colors", active ? "border-foreground bg-foreground text-background" : "hover:border-foreground/40 hover:bg-accent"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(n.icon, { className: "h-3.5 w-3.5" }), n.label]
								}, n.to);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: toggleTheme,
							"aria-label": "Toggle theme",
							className: "ml-auto grid h-8 w-8 shrink-0 place-items-center border border-foreground/40 hover:bg-accent md:ml-0",
							children: dark ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "h-4 w-4" })
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "flex items-center gap-1 overflow-x-auto border-t border-foreground/10 px-2 py-1 md:hidden",
					children: nav.map((n) => {
						const active = pathname === n.to;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: n.to,
							className: cn("flex shrink-0 items-center gap-1.5 border px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest", active ? "border-foreground bg-foreground text-background" : "border-foreground/20 hover:bg-accent"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(n.icon, { className: "h-3 w-3" }), n.label]
						}, n.to);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "mx-auto w-full max-w-7xl flex-1 px-4 py-6",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-foreground/20 py-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Sentinel/AI · OSINT analytics for public content only" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "v0.1 · No scraping · No ToS violations" })]
				})
			})
		]
	});
}
var KEY = "sentinel-ai-history-v1";
function loadHistory() {
	if (typeof window === "undefined") return [];
	try {
		const raw = window.localStorage.getItem(KEY);
		if (!raw) return [];
		return JSON.parse(raw);
	} catch {
		return [];
	}
}
function saveAnalysis(a) {
	const entry = {
		id: crypto.randomUUID(),
		createdAt: Date.now(),
		source: a.source,
		content: a.content,
		result: a.result
	};
	const list = [entry, ...loadHistory()].slice(0, 200);
	window.localStorage.setItem(KEY, JSON.stringify(list));
	window.dispatchEvent(new CustomEvent("sentinel:history"));
	return entry;
}
function deleteAnalysis(id) {
	const list = loadHistory().filter((x) => x.id !== id);
	window.localStorage.setItem(KEY, JSON.stringify(list));
	window.dispatchEvent(new CustomEvent("sentinel:history"));
}
function clearHistory() {
	window.localStorage.removeItem(KEY);
	window.dispatchEvent(new CustomEvent("sentinel:history"));
}
function getById(id) {
	return loadHistory().find((x) => x.id === id);
}
//#endregion
export { getById as a, deleteAnalysis as i, clearHistory as n, loadHistory as o, cn as r, saveAnalysis as s, AppShell as t };
