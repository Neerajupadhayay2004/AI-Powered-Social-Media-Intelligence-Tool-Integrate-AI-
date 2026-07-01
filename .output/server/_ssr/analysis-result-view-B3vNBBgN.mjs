import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { f as ListChecks, g as Brain, i as Shield, n as Target, w as FingerprintPattern, y as TriangleAlert } from "../_libs/lucide-react.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { r as cn } from "./history-store-CpLXu2WE.mjs";
import { t as RiskBadge } from "./risk-badge-CgooZWJk.mjs";
import { n as Root, t as Indicator } from "../_libs/radix-ui__react-progress.mjs";
import { a as YAxis, f as PolarAngleAxis, g as Tooltip, h as ResponsiveContainer, i as BarChart, l as Bar, m as Cell, n as RadarChart, o as XAxis, p as PolarGrid, u as Radar } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/analysis-result-view-B3vNBBgN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Card = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("rounded-xl border bg-card text-card-foreground shadow", className),
	...props
}));
Card.displayName = "Card";
var CardHeader = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("flex flex-col space-y-1.5 p-6", className),
	...props
}));
CardHeader.displayName = "CardHeader";
var CardTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("font-semibold leading-none tracking-tight", className),
	...props
}));
CardTitle.displayName = "CardTitle";
var CardDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
CardDescription.displayName = "CardDescription";
var CardContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("p-6 pt-0", className),
	...props
}));
CardContent.displayName = "CardContent";
var CardFooter = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("flex items-center p-6 pt-0", className),
	...props
}));
CardFooter.displayName = "CardFooter";
var Progress = import_react.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Indicator, {
		className: "h-full w-full flex-1 bg-primary transition-all",
		style: { transform: `translateX(-${100 - (value || 0)}%)` }
	})
}));
Progress.displayName = Root.displayName;
var badgeVariants = cva("inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
	variants: { variant: {
		default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
		secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
		destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
		outline: "text-foreground"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
function Section({ title, icon, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "rounded-none border-foreground/20 bg-card p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex items-center gap-2 border-b border-foreground/20 pb-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-foreground",
				children: icon
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-mono text-xs font-bold uppercase tracking-widest",
				children: title
			})]
		}), children]
	});
}
function EntityList({ label, items }) {
	if (!items?.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mb-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-wrap gap-1",
		children: items.map((v, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
			variant: "outline",
			className: "rounded-sm border-foreground/30 font-mono text-[11px]",
			children: v
		}, `${label}-${i}`))
	})] });
}
function AnalysisResultView({ result, content }) {
	const emotionData = Object.entries(result.emotion_scores ?? {}).map(([name, value]) => ({
		name: name.slice(0, 3).toUpperCase(),
		value: Math.round(value * 100)
	}));
	const scoreBars = [
		{
			name: "RISK",
			value: result.risk_score
		},
		{
			name: "SCAM",
			value: result.scam_probability
		},
		{
			name: "CONF",
			value: result.classification_confidence
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "rounded-none border-foreground/20 bg-card p-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:items-center sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mb-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground",
								children: "Verdict"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "truncate text-2xl font-bold tracking-tight",
									children: result.classification
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RiskBadge, { level: result.risk_level })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: result.summary
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "shrink-0 text-right",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground",
							children: "Risk Score"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "font-mono text-4xl font-black leading-none",
							children: [Math.round(result.risk_score), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-lg text-muted-foreground",
								children: "/100"
							})]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						title: "Threat Profile",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "h-4 w-4" }),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									k: "Category",
									v: result.threat_category
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									k: "Scam Type",
									v: result.scam_type ?? "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									k: "Kill Chain",
									v: result.kill_chain_phase
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									k: "Sentiment",
									v: `${result.sentiment} (${result.sentiment_score.toFixed(2)})`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									k: "Emotion",
									v: result.emotion
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-2 pt-2",
									children: scoreBars.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mb-1 flex justify-between font-mono text-[10px] uppercase tracking-widest",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: b.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [Math.round(b.value), "%"] })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
										value: b.value,
										className: "h-1 rounded-none"
									})] }, b.name))
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						title: "Emotion Signal",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brain, { className: "h-4 w-4" }),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-52 w-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadarChart, {
								data: emotionData,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolarGrid, { stroke: "var(--border)" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PolarAngleAxis, {
										dataKey: "name",
										tick: {
											fill: "var(--muted-foreground)",
											fontSize: 10
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radar, {
										dataKey: "value",
										stroke: "var(--foreground)",
										fill: "var(--foreground)",
										fillOpacity: .25
									})
								]
							}) })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						title: "Score Matrix",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "h-4 w-4" }),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-52 w-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								data: scoreBars,
								layout: "vertical",
								margin: {
									left: 8,
									right: 16
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
										type: "number",
										domain: [0, 100],
										hide: true
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
										type: "category",
										dataKey: "name",
										tick: {
											fill: "var(--muted-foreground)",
											fontSize: 10
										},
										width: 40,
										axisLine: false,
										tickLine: false
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
										cursor: { fill: "color-mix(in oklab, var(--foreground) 8%, transparent)" },
										contentStyle: {
											background: "var(--background)",
											border: "1px solid var(--border)",
											borderRadius: 0,
											fontFamily: "var(--font-mono)",
											fontSize: 11
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "value",
										children: scoreBars.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: "var(--foreground)" }, i))
									})
								]
							}) })
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
					title: "AI Reasoning",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brain, { className: "h-4 w-4" }),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "whitespace-pre-wrap text-sm leading-relaxed",
						children: result.explanation
					}), result.keywords?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 flex flex-wrap gap-1",
						children: result.keywords.map((k, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							variant: "secondary",
							className: "rounded-sm border border-foreground/20 font-mono text-[11px]",
							children: ["#", k]
						}, i))
					}) : null]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
					title: "Scam Indicators",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-4 w-4" }),
					children: [result.scam_indicators?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-2 text-sm",
						children: result.scam_indicators.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-2 border-l-2 border-foreground/60 pl-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs text-muted-foreground",
								children: String(i + 1).padStart(2, "0")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: s })]
						}, i))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "No scam indicators detected."
					}), result.mitre_techniques?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground",
							children: "MITRE ATT&CK"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-1",
							children: result.mitre_techniques.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								variant: "outline",
								className: "rounded-sm border-foreground/40 font-mono text-[11px]",
								children: [
									t.id,
									" · ",
									t.name
								]
							}, i))
						})]
					}) : null]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Extracted Entities",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FingerprintPattern, { className: "h-4 w-4" }),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntityList, {
							label: "Persons",
							items: result.entities?.persons ?? []
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntityList, {
							label: "Organizations",
							items: result.entities?.organizations ?? []
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntityList, {
							label: "Locations",
							items: result.entities?.locations ?? []
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntityList, {
							label: "Emails",
							items: result.entities?.emails ?? []
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntityList, {
							label: "Phones",
							items: result.entities?.phones ?? []
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntityList, {
							label: "URLs",
							items: result.entities?.urls ?? []
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntityList, {
							label: "Domains",
							items: result.entities?.domains ?? []
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntityList, {
							label: "IPs",
							items: result.entities?.ips ?? []
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntityList, {
							label: "Crypto Wallets",
							items: result.entities?.crypto_wallets ?? []
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntityList, {
							label: "Hashtags",
							items: result.entities?.hashtags ?? []
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntityList, {
							label: "Mentions",
							items: result.entities?.mentions ?? []
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntityList, {
							label: "Dates",
							items: result.entities?.dates ?? []
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntityList, {
							label: "Currencies",
							items: result.entities?.currencies ?? []
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				title: "Recommended Actions",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListChecks, { className: "h-4 w-4" }),
				children: result.recommendations?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "space-y-2 text-sm",
					children: result.recommendations.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-xs font-bold text-muted-foreground",
							children: String(i + 1).padStart(2, "0")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: r })]
					}, i))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "No specific actions recommended."
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
				className: "rounded-none border border-foreground/20 bg-muted/30 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
					className: "cursor-pointer font-mono text-xs uppercase tracking-widest",
					children: "Analyzed Content"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					className: "mt-3 whitespace-pre-wrap break-words font-mono text-xs text-muted-foreground",
					children: content
				})]
			})
		]
	});
}
function Row({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex justify-between gap-4 border-b border-dashed border-foreground/15 pb-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "truncate text-right font-mono text-xs",
			children: v
		})]
	});
}
//#endregion
export { AnalysisResultView as t };
