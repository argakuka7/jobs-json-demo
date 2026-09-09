import { TSS_SERVER_FUNCTION, createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lamaran-server-DvIR_v6M.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var URL = process.env.UPSTASH_REDIS_REST_URL;
var TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
var KEY = "lamaran";
async function redis(command, ...args) {
	const json = await (await fetch(`${URL}/${command}/${args.map(encodeURIComponent).join("/")}`, { headers: { Authorization: `Bearer ${TOKEN}` } })).json();
	if (json.error) throw new Error(json.error);
	return json.result;
}
async function readLamaran() {
	const raw = await redis("get", KEY);
	return raw ? JSON.parse(String(raw)) : [];
}
var submitLamaran_createServerFn_handler = createServerRpc({
	id: "b729010d29a0f43ccf615e622bf5cd9fa6d2ea5cc2ab956ed132cfa2a8221981",
	name: "submitLamaran",
	filename: "src/lib/lamaran-server.ts"
}, (opts) => submitLamaran.__executeServer(opts));
var submitLamaran = createServerFn({ method: "POST" }).validator((data) => data).handler(submitLamaran_createServerFn_handler, async ({ data }) => {
	const all = await readLamaran();
	all.push(data);
	await redis("set", KEY, JSON.stringify(all));
	return {
		ok: true,
		total: all.length
	};
});
var getLamaran_createServerFn_handler = createServerRpc({
	id: "23aae19742f141c0a1ab0de87b500fd99e50e7a49c37b77a324640939c28d50a",
	name: "getLamaran",
	filename: "src/lib/lamaran-server.ts"
}, (opts) => getLamaran.__executeServer(opts));
var getLamaran = createServerFn({ method: "GET" }).handler(getLamaran_createServerFn_handler, async () => {
	return readLamaran();
});
//#endregion
export { getLamaran_createServerFn_handler, submitLamaran_createServerFn_handler };
