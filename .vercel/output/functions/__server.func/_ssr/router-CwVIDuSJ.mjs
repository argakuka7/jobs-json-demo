import { require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { HeadContent, Scripts, createFileRoute, createRootRouteWithContext, createRouter, lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { TSS_SERVER_FUNCTION, createServerFn, getServerFnById } from "./ssr.mjs";
import { QueryClient } from "../_libs/tanstack__query-core.mjs";
import { setupRouterSsrQueryIntegration } from "../_libs/@tanstack/react-router-ssr-query+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lamaran-server-C5Sx0SiC.js
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
var submitLamaran = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("b729010d29a0f43ccf615e622bf5cd9fa6d2ea5cc2ab956ed132cfa2a8221981"));
var getLamaran = createServerFn({ method: "GET" }).handler(createSsrRpc("23aae19742f141c0a1ab0de87b500fd99e50e7a49c37b77a324640939c28d50a"));
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-CwVIDuSJ.js
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
function AppProviders({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var tailwind_default = "/assets/tailwind-BXKjZgg0.css";
var Route$3 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "TanStack Start Starter" }
		],
		links: [{
			rel: "stylesheet",
			href: tailwind_default
		}]
	}),
	shellComponent: RootDocument
});
function RootDocument({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
var $$splitComponentImporter$2 = () => import("./routes-DuGwk3xV.mjs");
var Route$2 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./admin-BrkBxBIb.mjs");
var Route$1 = createFileRoute("/admin")({
	component: lazyRouteComponent($$splitComponentImporter$1, "component"),
	loader: async () => {
		return { lamaran: await getLamaran() };
	}
});
var $$splitComponentImporter = () => import("../_jobId-DJUCrD2r.mjs");
var Route = createFileRoute("/jobs/$jobId")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$2.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$3
	}),
	AdminRoute: Route$1.update({
		id: "/admin",
		path: "/admin",
		getParentRoute: () => Route$3
	}),
	JobsJobIdRoute: Route.update({
		id: "/jobs/$jobId",
		path: "/jobs/$jobId",
		getParentRoute: () => Route$3
	})
};
var routeTree = Route$3._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var getRouter = () => {
	const queryClient = new QueryClient();
	const router = createRouter({
		routeTree,
		scrollRestoration: true,
		context: { queryClient },
		Wrap: AppProviders
	});
	setupRouterSsrQueryIntegration({
		router,
		queryClient
	});
	return router;
};
//#endregion
export { Route, Route$1, router_exports, submitLamaran };
