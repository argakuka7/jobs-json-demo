import { __toESM } from "./_runtime.mjs";
import { require_jsx_runtime, require_react } from "./_libs/react+tanstack__react-query.mjs";
import { Link, notFound } from "./_libs/@tanstack/react-router+[...].mjs";
import { Route, submitLamaran } from "./_ssr/router-CwVIDuSJ.mjs";
import { company, getJob } from "./_ssr/jobs-C0GDF-Ae.mjs";
import { buttonVariants } from "./_ssr/button-k0aYydsz.mjs";
import { ArrowLeft, Check, CircleCheck, Clock, MapPin, Wallet } from "./_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_jobId-DJUCrD2r.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function JobDetail() {
	const { jobId } = Route.useParams();
	const job = getJob(jobId);
	if (!job) throw notFound();
	const [form, setForm] = (0, import_react.useState)({
		nama: "",
		email: "",
		pesan: ""
	});
	const [submitted, setSubmitted] = (0, import_react.useState)(false);
	const handleSubmit = async (event) => {
		event.preventDefault();
		await submitLamaran({ data: {
			...form,
			jobId: job.id,
			jobTitle: job.title,
			waktu: (/* @__PURE__ */ new Date()).toISOString()
		} });
		setSubmitted(true);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "border-b",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-3xl items-center justify-between px-6 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Kembali"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-semibold",
						children: company.name
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-3xl px-6 py-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground",
						children: [
							job.department,
							" · ",
							job.type
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-4 text-3xl font-bold tracking-tight sm:text-4xl",
						children: job.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-lg text-muted-foreground",
						children: job.summary
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4" }),
									" ",
									job.location
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "h-4 w-4" }),
									" ",
									job.salary
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4" }),
									" Deadline: ",
									job.deadline
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: `mailto:${company.email}?subject=Lamaran ${encodeURIComponent(job.title)}`,
							className: buttonVariants({ size: "lg" }),
							children: "Lamar Sekarang"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#tanggung-jawab",
							className: buttonVariants({
								variant: "outline",
								size: "lg"
							}),
							children: "Lihat Detail"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						id: "tanggung-jawab",
						className: "mt-12",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl font-bold",
							children: "Tanggung Jawab"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 space-y-3",
							children: job.responsibilities.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 h-5 w-5 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: item
								})]
							}, item))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl font-bold",
							children: "Kualifikasi"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 space-y-3",
							children: job.requirements.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 h-5 w-5 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: item
								})]
							}, item))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-12 rounded-xl border bg-card p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-bold",
							children: "Lamar Sekarang"
						}), submitted ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex items-start gap-3 rounded-lg bg-emerald-50 p-4 text-sm text-emerald-800",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "mt-0.5 h-5 w-5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold",
								children: "Lamaran terkirim!"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1",
								children: "Data tersimpan di browser kamu (localStorage). Tim kami akan menghubungi lewat email."
							})] })]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleSubmit,
							className: "mt-4 grid gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-4 sm:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "nama",
										className: "mb-1.5 block text-sm font-medium",
										children: "Nama Lengkap"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "nama",
										required: true,
										value: form.nama,
										onChange: (e) => setForm({
											...form,
											nama: e.target.value
										}),
										placeholder: "Contoh: Siti Rahma",
										className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/50"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										htmlFor: "email",
										className: "mb-1.5 block text-sm font-medium",
										children: "Email"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "email",
										type: "email",
										required: true,
										value: form.email,
										onChange: (e) => setForm({
											...form,
											email: e.target.value
										}),
										placeholder: "kamu@email.com",
										className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/50"
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "pesan",
									className: "mb-1.5 block text-sm font-medium",
									children: "Kenapa kamu cocok?"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									id: "pesan",
									rows: 4,
									required: true,
									value: form.pesan,
									onChange: (e) => setForm({
										...form,
										pesan: e.target.value
									}),
									placeholder: "Ceritakan singkat pengalaman dan ketertarikanmu di kebijakan publik...",
									className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/50"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									className: buttonVariants({ size: "lg" }),
									children: "Kirim Lamaran"
								}) })
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-3xl px-6 py-8 text-center text-sm text-muted-foreground",
					children: [
						"© 2026 ",
						company.name,
						" — perusahaan fiktif untuk latihan kelas"
					]
				})
			})
		]
	});
}
//#endregion
export { JobDetail as component };
