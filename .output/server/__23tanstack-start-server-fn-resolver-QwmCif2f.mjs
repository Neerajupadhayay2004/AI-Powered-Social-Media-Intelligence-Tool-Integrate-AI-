//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-QwmCif2f.js
var manifest = {
	"6f2e6da1549e19f4e7e47aa7c608d82687d89eb6bc670aeb2e244aa10e58c8d2": {
		functionName: "chatAssistant_createServerFn_handler",
		importer: () => import("./_ssr/analyze.functions-BaVqIggw.mjs")
	},
	"dd7332aaaacbf6f0673e96af347dde2d543c0a0b8c2e8037bc875f7ca5759b43": {
		functionName: "analyzeText_createServerFn_handler",
		importer: () => import("./_ssr/analyze.functions-BaVqIggw.mjs")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
