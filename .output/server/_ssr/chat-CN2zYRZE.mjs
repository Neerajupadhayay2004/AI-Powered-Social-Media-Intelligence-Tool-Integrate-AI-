import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { S as LoaderCircle, b as Sparkles, o as Send, t as Trash2 } from "../_libs/lucide-react.mjs";
import { o as loadHistory, t as AppShell } from "./history-store-CpLXu2WE.mjs";
import { r as chatAssistant, t as Textarea } from "./analyze.functions-DBh6dLCs.mjs";
import { t as Button } from "./button-CsoKkFFg.mjs";
import { t as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/chat-CN2zYRZE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SUGGESTIONS = [
	"Summarize the most recent analysis in plain English.",
	"Which posts in my history look like coordinated scam campaigns?",
	"What MITRE ATT&CK techniques appear in my latest analysis?",
	"Draft an investigator note for the highest-risk item."
];
function ChatPage() {
	const [messages, setMessages] = (0, import_react.useState)([]);
	const [input, setInput] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [ctxAll, setCtxAll] = (0, import_react.useState)(false);
	const [history, setHistory] = (0, import_react.useState)([]);
	const endRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		setHistory(loadHistory());
	}, []);
	(0, import_react.useEffect)(() => {
		endRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);
	const send = async (text) => {
		const content = (text ?? input).trim();
		if (!content) return;
		const next = [...messages, {
			role: "user",
			content
		}];
		setMessages(next);
		setInput("");
		setLoading(true);
		try {
			const { reply } = await chatAssistant({ data: {
				messages: next,
				context: ctxAll ? JSON.stringify(history.slice(0, 10).map((h) => ({
					createdAt: h.createdAt,
					source: h.source,
					result: h.result,
					snippet: h.content.slice(0, 400)
				})), null, 2) : history[0] ? JSON.stringify({
					latest: history[0].result,
					snippet: history[0].content.slice(0, 600)
				}, null, 2) : void 0
			} });
			setMessages([...next, {
				role: "assistant",
				content: reply
			}]);
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Chat failed");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground",
					children: "// Investigator Assistant"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 truncate text-3xl font-black tracking-tight sm:text-4xl",
					children: "Sentinel Copilot"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Ask about your analyses. The assistant sees your most recent report as context."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: () => setMessages([]),
			className: "shrink-0 border border-foreground/40 px-3 py-2 font-mono text-[10px] uppercase tracking-widest hover:bg-accent",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "mr-1 inline h-3 w-3" }), " Reset"]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border border-foreground/20 bg-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 border-b border-foreground/20 px-4 py-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-mono text-[10px] uppercase tracking-widest text-muted-foreground",
						children: [
							"Session · ",
							messages.length,
							" messages · context: ",
							history.length ? ctxAll ? "last 10" : "latest" : "empty"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "ml-auto flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: ctxAll,
							onChange: (e) => setCtxAll(e.target.checked),
							className: "accent-foreground"
						}), "Include last 10"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-h-[55vh] min-h-[320px] space-y-4 overflow-y-auto p-4",
				children: [
					messages.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid-bg -m-4 flex flex-col items-center justify-center gap-4 p-10 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs uppercase tracking-widest text-muted-foreground",
							children: "Start a conversation"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex max-w-2xl flex-wrap justify-center gap-2",
							children: SUGGESTIONS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => send(s),
								className: "border border-foreground/30 bg-background px-3 py-2 text-left font-mono text-[11px] hover:bg-accent",
								children: ["→ ", s]
							}, s))
						})]
					}),
					messages.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `flex ${m.role === "user" ? "justify-end" : "justify-start"}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `max-w-[85%] whitespace-pre-wrap border p-3 font-mono text-sm leading-relaxed ${m.role === "user" ? "border-foreground bg-foreground text-background" : "border-foreground/20 bg-background"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mb-1 text-[9px] uppercase tracking-widest opacity-60",
								children: m.role === "user" ? "You" : "Sentinel"
							}), m.content]
						})
					}, i)),
					loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex justify-start",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border border-foreground/20 bg-background p-3 font-mono text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 inline h-3 w-3 animate-spin" }), " thinking…"]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: endRef })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end gap-2 border-t border-foreground/20 p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: input,
					onChange: (e) => setInput(e.target.value),
					onKeyDown: (e) => {
						if (e.key === "Enter" && !e.shiftKey) {
							e.preventDefault();
							send();
						}
					},
					placeholder: "Ask the analyst… (Enter to send, Shift+Enter for newline)",
					rows: 2,
					className: "min-h-[3rem] flex-1 rounded-none border-foreground/30 bg-background font-mono text-sm",
					maxLength: 4e3
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => send(),
					disabled: loading || !input.trim(),
					className: "rounded-none border border-foreground bg-foreground font-mono text-xs font-bold uppercase tracking-widest text-background hover:opacity-90",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "mr-1 h-4 w-4" }), " Send"]
				})]
			})
		]
	})] });
}
//#endregion
export { ChatPage as component };
