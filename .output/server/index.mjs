globalThis.__nitro_main__ = import.meta.url;
import { a as FastResponse, n as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/assets/analyze-CL7HMO3Z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17f3-ZZdDP/Va27WHKIIH4cHWnVbieLE\"",
		"mtime": "2026-07-01T12:02:06.342Z",
		"size": 6131,
		"path": "../public/assets/analyze-CL7HMO3Z.js"
	},
	"/assets/analysis-result-view-syIIDRGC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6770-Vpyj1hLeLI5MZ5MiJ1/OPXSvxD8\"",
		"mtime": "2026-07-01T12:02:06.342Z",
		"size": 26480,
		"path": "../public/assets/analysis-result-view-syIIDRGC.js"
	},
	"/assets/button-BfyIfEQT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1008-Cfqy5XyV84t1Skof8AW+U5k7MLU\"",
		"mtime": "2026-07-01T12:02:06.342Z",
		"size": 4104,
		"path": "../public/assets/button-BfyIfEQT.js"
	},
	"/assets/PolarRadiusAxis-B9sJF86e.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5c7be-WONizVkjMjpznoZA4WZODeIUEqo\"",
		"mtime": "2026-07-01T12:02:06.342Z",
		"size": 378814,
		"path": "../public/assets/PolarRadiusAxis-B9sJF86e.js"
	},
	"/assets/chat-XE_KUZLR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15b7-AHp5M4Z/MTdjjfhx3hb4cSbrebw\"",
		"mtime": "2026-07-01T12:02:06.342Z",
		"size": 5559,
		"path": "../public/assets/chat-XE_KUZLR.js"
	},
	"/assets/dist-FmuNIcDy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5dc4-y+mJTbYO1YBzftI0JhHLzgbcLwk\"",
		"mtime": "2026-07-01T12:02:06.342Z",
		"size": 24004,
		"path": "../public/assets/dist-FmuNIcDy.js"
	},
	"/assets/history-store-D21Kaqx8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"855e-4Jwfy80akKfynmU9kw1LAaip88Q\"",
		"mtime": "2026-07-01T12:02:06.342Z",
		"size": 34142,
		"path": "../public/assets/history-store-D21Kaqx8.js"
	},
	"/assets/history._id-XOlqUXNb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ff3-0aF7sUCgicgUwpJIktmpNteyJrM\"",
		"mtime": "2026-07-01T12:02:06.342Z",
		"size": 4083,
		"path": "../public/assets/history._id-XOlqUXNb.js"
	},
	"/assets/history.index-CBUWP2PB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"108d-n+2hf8xbJ6gMQ+Xt8znfLk/KDZU\"",
		"mtime": "2026-07-01T12:02:06.342Z",
		"size": 4237,
		"path": "../public/assets/history.index-CBUWP2PB.js"
	},
	"/assets/risk-badge-BAbG7Bmw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"286-Tbz/PGtF2mrrGvKgbDc54IXKteM\"",
		"mtime": "2026-07-01T12:02:06.342Z",
		"size": 646,
		"path": "../public/assets/risk-badge-BAbG7Bmw.js"
	},
	"/assets/routes-D6kdiYfO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9013-1IjGtgEM82nHKomgJZLzVagROFE\"",
		"mtime": "2026-07-01T12:02:06.342Z",
		"size": 36883,
		"path": "../public/assets/routes-D6kdiYfO.js"
	},
	"/assets/trash-2-DW8Og72v.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"145-Bv1LBdkatbyjoyfFCiN4vfccBs8\"",
		"mtime": "2026-07-01T12:02:06.342Z",
		"size": 325,
		"path": "../public/assets/trash-2-DW8Og72v.js"
	},
	"/assets/styles-17e6K1i3.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"138dc-1uuiBY29tjacOlhOfaD8YWWPISk\"",
		"mtime": "2026-07-01T12:02:06.342Z",
		"size": 80092,
		"path": "../public/assets/styles-17e6K1i3.css"
	},
	"/assets/index-CuQsdij_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"54531-gG3ivZ2He5dNKPr0d7oPSAFutp8\"",
		"mtime": "2026-07-01T12:02:06.341Z",
		"size": 345393,
		"path": "../public/assets/index-CuQsdij_.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_BGSr3x = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_BGSr3x
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
