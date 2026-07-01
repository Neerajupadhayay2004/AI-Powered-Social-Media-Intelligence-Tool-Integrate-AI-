import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { r as cn } from "./history-store-CpLXu2WE.mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-QwmCif2f.mjs";
import { i as TSS_SERVER_FUNCTION, l as createServerFn } from "./esm-Dova13aH.mjs";
import { i as stringType, n as enumType, r as objectType, t as arrayType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/analyze.functions-DBh6dLCs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var AnalyzeInput = objectType({
	content: stringType().trim().min(1).max(1e4),
	source: stringType().max(60).optional()
});
var analyzeText = createServerFn({ method: "POST" }).inputValidator((d) => AnalyzeInput.parse(d)).handler(createSsrRpc("dd7332aaaacbf6f0673e96af347dde2d543c0a0b8c2e8037bc875f7ca5759b43"));
var ChatInput = objectType({
	messages: arrayType(objectType({
		role: enumType(["user", "assistant"]),
		content: stringType().min(1).max(4e3)
	})).min(1).max(30),
	context: stringType().max(2e4).optional()
});
var chatAssistant = createServerFn({ method: "POST" }).inputValidator((d) => ChatInput.parse(d)).handler(createSsrRpc("6f2e6da1549e19f4e7e47aa7c608d82687d89eb6bc670aeb2e244aa10e58c8d2"));
//#endregion
export { analyzeText as n, chatAssistant as r, Textarea as t };
