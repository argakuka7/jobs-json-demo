import { require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { company, jobs } from "./jobs-C0GDF-Ae.mjs";
import { buttonVariants } from "./button-k0aYydsz.mjs";
import { ArrowRight, Briefcase, Clock, MapPin, Wallet } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DuGwk3xV.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-10 border-b bg-background/80 backdrop-blur",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-5xl items-center justify-between px-6 py-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground",
								children: company.name.charAt(0)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold",
								children: company.name
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
							className: "hidden gap-6 text-sm text-muted-foreground sm:flex",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#lowongan",
									className: "hover:text-foreground",
									children: "Lowongan"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#tentang",
									className: "hover:text-foreground",
									children: "Tentang"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#proses",
									className: "hover:text-foreground",
									children: "Proses"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#lowongan",
							className: buttonVariants({ size: "sm" }),
							children: "Daftar"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-5xl px-6 pt-20 pb-16 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-2 rounded-full border bg-secondary px-4 py-1.5 text-xs font-medium text-secondary-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-emerald-500" }),
							jobs.length,
							" lowongan terbuka"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mx-auto mt-6 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl",
						children: company.tagline
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-4 max-w-xl text-lg text-muted-foreground",
						children: "Bergabung dengan tim riset yang mengubah data dan regulasi menjadi kebijakan yang berdampak nyata."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex justify-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "#lowongan",
							className: buttonVariants({ size: "lg" }),
							children: ["Lihat Lowongan ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-2 h-4 w-4" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#tentang",
							className: buttonVariants({
								variant: "outline",
								size: "lg"
							}),
							children: "Tentang Kami"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "lowongan",
				className: "mx-auto max-w-5xl px-6 py-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-8 flex items-end justify-between",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-bold",
						children: "Lowongan Terbuka"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Pilih peran yang cocok denganmu"
					})] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: jobs.map((job) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/jobs/$jobId",
						params: { jobId: job.id },
						className: "group rounded-xl border bg-card p-6 transition hover:border-primary/40 hover:shadow-md",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-lg font-semibold group-hover:text-primary",
									children: job.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: job.department
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground",
									children: job.type
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 line-clamp-2 text-sm text-muted-foreground",
								children: job.summary
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3.5 w-3.5" }),
											" ",
											job.location
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "h-3.5 w-3.5" }),
											" ",
											job.salary
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3.5 w-3.5" }),
											" ",
											job.deadline
										]
									})
								]
							})
						]
					}, job.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "tentang",
				className: "border-t bg-secondary/40",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-5xl px-6 py-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "text-2xl font-bold",
						children: [
							"Kenapa ",
							company.name,
							"?"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 grid gap-6 sm:grid-cols-3",
						children: [
							{
								icon: Briefcase,
								title: "Dampak nyata",
								desc: "Rekomendasi kami dipakai pemerintah daerah dan mitra internasional."
							},
							{
								icon: ArrowRight,
								title: "AI-first",
								desc: "Kami memakai AI di seluruh alur kerja — dan kamu akan belajar itu."
							},
							{
								icon: MapPin,
								title: "Fleksibel",
								desc: "Hybrid dan remote, dengan tim yang tersebar di seluruh Indonesia."
							}
						].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border bg-card p-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "h-6 w-6 text-primary" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-4 font-semibold",
									children: item.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted-foreground",
									children: item.desc
								})
							]
						}, item.title))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "proses",
				className: "mx-auto max-w-5xl px-6 py-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-bold",
					children: "Proses Rekrutmen"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 grid gap-4 sm:grid-cols-4",
					children: [
						[
							"1",
							"Submit lamaran",
							"Isi form dan kirim CV."
						],
						[
							"2",
							"Tugas analisis",
							"Studi kasus kebijakan, 3 hari."
						],
						[
							"3",
							"Wawancara",
							"Diskusi hasil tugas, 45 menit."
						],
						[
							"4",
							"Keputusan",
							"Kabar dalam 1 minggu."
						]
					].map(([num, title, desc]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative rounded-xl border bg-card p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground",
								children: num
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-4 font-semibold",
								children: title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: desc
							})
						]
					}, num))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-5xl flex-col items-center gap-2 px-6 py-10 text-center text-sm text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium text-foreground",
							children: company.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							company.location,
							" · ",
							company.email
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs",
							children: [
								"© 2026 ",
								company.name,
								" — perusahaan fiktif untuk latihan kelas"
							]
						})
					]
				})
			})
		]
	});
}
//#endregion
export { Home as component };
