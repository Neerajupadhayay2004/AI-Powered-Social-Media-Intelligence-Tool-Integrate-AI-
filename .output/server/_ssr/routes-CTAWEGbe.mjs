import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as ShieldAlert, c as ScanLine, p as Hash, v as Activity, x as OctagonAlert } from "../_libs/lucide-react.mjs";
import { o as loadHistory, t as AppShell } from "./history-store-CpLXu2WE.mjs";
import { t as RiskBadge } from "./risk-badge-CgooZWJk.mjs";
import { a as YAxis, c as CartesianGrid, d as Pie, g as Tooltip, h as ResponsiveContainer, m as Cell, o as XAxis, r as PieChart, s as Area, t as AreaChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CTAWEGbe.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useHistory() {
	const [list, setList] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		const sync = () => setList(loadHistory());
		sync();
		window.addEventListener("sentinel:history", sync);
		window.addEventListener("storage", sync);
		return () => {
			window.removeEventListener("sentinel:history", sync);
			window.removeEventListener("storage", sync);
		};
	}, []);
	return list;
}
function Dashboard() {
	const history = useHistory();
	const stats = (0, import_react.useMemo)(() => {
		const total = history.length;
		return {
			total,
			critical: history.filter((h) => h.result.risk_level === "Critical").length,
			high: history.filter((h) => h.result.risk_level === "High").length,
			avgRisk: total ? Math.round(history.reduce((s, h) => s + (h.result.risk_score || 0), 0) / total) : 0,
			scams: history.filter((h) => (h.result.scam_probability ?? 0) >= 50).length
		};
	}, [history]);
	const trend = (0, import_react.useMemo)(() => {
		const buckets = /* @__PURE__ */ new Map();
		for (let i = 6; i >= 0; i--) {
			const d = /* @__PURE__ */ new Date();
			d.setDate(d.getDate() - i);
			const k = d.toISOString().slice(5, 10);
			buckets.set(k, {
				day: k,
				count: 0,
				risk: 0
			});
		}
		for (const h of history) {
			const k = new Date(h.createdAt).toISOString().slice(5, 10);
			const b = buckets.get(k);
			if (b) {
				b.count += 1;
				b.risk = Math.max(b.risk, h.result.risk_score || 0);
			}
		}
		return Array.from(buckets.values());
	}, [history]);
	const categoryPie = (0, import_react.useMemo)(() => {
		const m = /* @__PURE__ */ new Map();
		for (const h of history) {
			const k = h.result.threat_category || "None";
			m.set(k, (m.get(k) ?? 0) + 1);
		}
		return Array.from(m.entries()).map(([name, value]) => ({
			name,
			value
		}));
	}, [history]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:flex sm:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground",
						children: "// Command Console"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-1 truncate text-3xl font-black tracking-tight sm:text-4xl",
						children: "Threat Intelligence Dashboard"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Analyze public social media content for scams, phishing, hate, threats, and sentiment."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/analyze",
				className: "inline-flex shrink-0 items-center gap-2 border border-foreground bg-foreground px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest text-background hover:opacity-90",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScanLine, { className: "h-4 w-4" }), " New Analysis"]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-2 gap-3 md:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-4 w-4" }),
					label: "Total Analyses",
					value: stats.total
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "h-4 w-4" }),
					label: "Avg Risk",
					value: `${stats.avgRisk}`,
					suffix: "/100"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OctagonAlert, { className: "h-4 w-4" }),
					label: "High + Critical",
					value: stats.high + stats.critical
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hash, { className: "h-4 w-4" }),
					label: "Likely Scams",
					value: stats.scams
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 grid gap-4 lg:grid-cols-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-none border border-foreground/20 bg-card p-5 lg:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, { title: "7-Day Activity" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-64",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
						data: trend,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								stroke: "var(--border)",
								strokeDasharray: "2 4",
								vertical: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "day",
								tick: {
									fill: "var(--muted-foreground)",
									fontSize: 10
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								tick: {
									fill: "var(--muted-foreground)",
									fontSize: 10
								},
								width: 28
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
								background: "var(--background)",
								border: "1px solid var(--border)",
								borderRadius: 0,
								fontSize: 11
							} }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
								type: "monotone",
								dataKey: "count",
								stroke: "var(--foreground)",
								fill: "var(--foreground)",
								fillOpacity: .15
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
								type: "monotone",
								dataKey: "risk",
								stroke: "var(--foreground)",
								strokeDasharray: "4 3",
								fill: "none"
							})
						]
					}) })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-none border border-foreground/20 bg-card p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, { title: "Threat Categories" }), categoryPie.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-64",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
						data: categoryPie,
						dataKey: "value",
						nameKey: "name",
						innerRadius: 40,
						outerRadius: 80,
						stroke: "var(--background)",
						children: categoryPie.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: `color-mix(in oklab, var(--foreground) ${100 - i * 15}%, transparent)` }, i))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
						background: "var(--background)",
						border: "1px solid var(--border)",
						borderRadius: 0,
						fontSize: 11
					} })] }) })
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyMini, { label: "No categories yet" })]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 rounded-none border border-foreground/20 bg-card",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-b border-foreground/20 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
					title: "Recent Analyses",
					noMargin: true
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/history",
					className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground",
					children: "View all →"
				})]
			}), history.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "divide-y divide-foreground/10",
				children: history.slice(0, 6).map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/history/$id",
					params: { id: h.id },
					className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 p-4 hover:bg-accent sm:grid-cols-[80px_minmax(0,1fr)_auto_auto]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:block",
							children: new Date(h.createdAt).toLocaleDateString(void 0, {
								month: "short",
								day: "2-digit"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "min-w-0 truncate text-sm",
							children: h.content.slice(0, 140)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:block",
							children: h.result.classification
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RiskBadge, { level: h.result.risk_level })
					]
				}) }, h.id))
			})]
		})
	] });
}
function SectionHeader({ title, noMargin }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `flex items-center gap-2 ${noMargin ? "" : "mb-4 border-b border-foreground/20 pb-2"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-1 bg-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "font-mono text-xs font-bold uppercase tracking-widest",
			children: title
		})]
	});
}
function Stat({ icon, label, value, suffix }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative overflow-hidden rounded-none border border-foreground/20 bg-card p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-muted-foreground",
				children: icon
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 font-mono text-3xl font-black leading-none",
			children: [value, suffix ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-base text-muted-foreground",
				children: suffix
			}) : null]
		})]
	});
}
function Empty() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid-bg flex flex-col items-center justify-center gap-3 p-12 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScanLine, { className: "h-8 w-8 text-muted-foreground" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs uppercase tracking-widest text-muted-foreground",
				children: "No analyses yet"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/analyze",
				className: "border border-foreground bg-foreground px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest text-background hover:opacity-90",
				children: "Run First Analysis"
			})
		]
	});
}
function EmptyMini({ label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid-bg flex h-64 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground",
			children: label
		})
	});
}
//#endregion
export { Dashboard as component };
