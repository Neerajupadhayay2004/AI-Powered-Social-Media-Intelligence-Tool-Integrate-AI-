import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { r as cn } from "./history-store-CpLXu2WE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/risk-badge-CgooZWJk.js
var import_jsx_runtime = require_jsx_runtime();
var styles = {
	Low: "bg-background text-foreground border-foreground/30",
	Medium: "bg-foreground/10 text-foreground border-foreground/50",
	High: "bg-foreground/70 text-background border-foreground",
	Critical: "bg-foreground text-background border-foreground"
};
function RiskBadge({ level, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-1.5 rounded-sm border px-2 py-0.5 font-mono text-[11px] font-bold uppercase tracking-widest", styles[level] ?? styles.Low, className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-current" }), level]
	});
}
//#endregion
export { RiskBadge as t };
