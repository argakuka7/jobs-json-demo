import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import { buttonVariants } from '@/components/ui/button'

export const Route = createFileRoute('/deploy')({ component: Deploy })

const LANGKAH = [
  {
    no: '01',
    judul: 'Persiapan',
    isi: 'Butuh tiga akun gratis — GitHub (tempat repo), Netlify (hosting), dan Upstash (database lamaran) — ditambah Node 22 dan pnpm di laptop. Siapkan juga password admin baru; jangan pakai bawaan kelas2026.',
  },
  {
    no: '02',
    judul: 'Salin repo ke akunmu',
    isi: 'Buka repo kelas ini di GitHub, klik Fork, pilih akunmu. Cara lain yang lebih bersih: buat repo kosong di GitHub, lalu di laptop jalankan git clone, git remote set-url origin <repo-mu>, dan git push -u origin main.',
  },
  {
    no: '03',
    judul: 'Jalankan di laptop',
    isi: 'pnpm install lalu pnpm dev. Situs terbuka di localhost:8080. Tanpa env apa pun situs sudah jalan penuh; lamaran disimpan di .data/lamaran.json yang tidak ikut ke GitHub.',
  },
  {
    no: '04',
    judul: 'Buat database Upstash',
    isi: 'Daftar di console.upstash.com, buka tab Redis lalu Create database. Pilih tipe Regional dengan region ap-southeast-1 (Singapore). Setelah jadi, buka database itu, cari bagian REST API, lalu salin Endpoint dan Token — pakai token read-write, bukan yang Readonly.',
  },
  {
    no: '05',
    judul: 'Isi env, lalu deploy ke Netlify',
    isi: 'Salin .env.example jadi .env.local dan isi UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN, dan ADMIN_PASSWORD. Uji dulu dari laptop. Setelah itu di Netlify: Add new site → Import an existing project → pilih repo, lalu isi tiga variabel yang sama di Environment variables — tanpa awalan VITE_ supaya tidak terkirim ke browser. Akhiri dengan Deploy site.',
  },
  {
    no: '06',
    judul: 'Verifikasi dan beres-beres',
    isi: 'Kirim satu lamaran dari situs yang sudah live, buka /admin, pastikan lamaran muncul, lalu cek key lamaran di Data Browser Upstash. Kalau sudah aman: hapus repo lama dan README lama supaya hanya ada satu repo dan satu sumber kebenaran.',
  },
]

const MASALAH = [
  [
    'Build gagal, keluhan versi Node',
    'Tambahkan variabel NODE_VERSION bernilai 22 di Environment variables, lalu Deploys → Trigger deploy → Clear cache and deploy site.',
  ],
  [
    'Build gagal saat memasang paket',
    'Pastikan pnpm-lock.yaml ikut ter-commit dan field packageManager di package.json tidak dihapus.',
  ],
  [
    'Lamaran hilang setelah refresh',
    'Env Upstash belum terbaca. Cek URL tanpa garis miring di akhir, pastikan token read-write, lalu redeploy.',
  ],
  [
    '/admin selalu bilang "Password salah"',
    'ADMIN_PASSWORD belum terisi saat build. Isi variabelnya, lalu Clear cache and deploy site.',
  ],
  [
    'Halaman detail 404 saat di-refresh',
    'Pastikan netlify.toml masih ada dan build memakai NITRO_PRESET=netlify.',
  ],
  [
    'Perubahan env tidak berpengaruh',
    'Netlify menyuntik env saat build, bukan saat jalan. Setiap perubahan env wajib redeploy.',
  ],
]

const PERINTAH = [
  ['pnpm install', 'Pasang semua dependensi.'],
  ['pnpm dev', 'Situs jalan lokal di localhost:8080.'],
  ['pnpm typecheck', 'Periksa tipe TypeScript tanpa build.'],
  ['pnpm lint', 'Periksa kode dengan oxlint.'],
  ['pnpm check', 'Rapikan format dan perbaiki lint otomatis.'],
  ['pnpm build', 'Build produksi (Netlify memakai NITRO_PRESET=netlify).'],
]

function Deploy() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link
            to="/panduan"
            className="inline-flex items-center gap-2 text-sm text-cream-dim hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Kembali ke panduan
          </Link>
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-cream-dim">
            Dokumen kelas · Teknis
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-12">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-cream-dim">
          Dari repo sampai situs hidup
        </p>
        <h1 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">
          Panduan deploy, enam langkah.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-cream-dim">
          Enam langkah dari repo kelas ini sampai situsmu sendiri hidup di
          internet, lengkap dengan database Upstash supaya lamaran tersimpan
          permanen.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-4">
          <Link to="/panduan" className={buttonVariants()}>
            Empat langkah versi ringkas
          </Link>
          <span className="stamp">Sekitar 30 menit</span>
        </div>

        <section className="reveal mt-12">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-cream-dim">
            Langkah 01 — 06
          </p>
          <h2 className="mt-2 font-serif text-3xl">Kerjakan berurutan.</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {LANGKAH.map((l) => (
              <div key={l.no} className="arch-card border-t-2 border-t-cobalt p-6">
                <span className="eyebrow">Langkah {l.no}</span>
                <h3 className="mt-3 font-serif text-xl">{l.judul}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{l.isi}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="reveal mt-12">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-cream-dim">
            Perintah harian
          </p>
          <h2 className="mt-2 font-serif text-3xl">Yang akan sering kamu ketik.</h2>
          <div className="arch-card mt-6 divide-y divide-ink/10">
            {PERINTAH.map(([cmd, arti]) => (
              <div key={cmd} className="grid gap-1 px-6 py-4 sm:grid-cols-[auto_1fr] sm:gap-6">
                <code className="font-mono text-[13px] font-bold text-cobalt-deep">{cmd}</code>
                <p className="text-sm text-ink-muted">{arti}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="reveal mt-12">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-cream-dim">
            Kalau ada yang gagal
          </p>
          <h2 className="mt-2 font-serif text-3xl">Enam gangguan yang paling sering.</h2>
          <div className="arch-card mt-6 divide-y divide-ink/10">
            {MASALAH.map(([gejala, solusi]) => (
              <div key={gejala} className="grid gap-1.5 px-6 py-5 sm:grid-cols-[220px_1fr] sm:gap-6">
                <p className="font-mono text-[13px] font-bold text-cobalt-deep">{gejala}</p>
                <p className="text-sm leading-relaxed text-ink-muted">{solusi}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="reveal mt-12">
          <div className="arch-card border-t-2 border-t-cobalt p-6 sm:p-8">
            <span className="eyebrow">Setelah sukses</span>
            <h2 className="mt-3 font-serif text-xl">Beres-beres, lalu tinggalkan satu jejak.</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              Hapus repo lama dan README lama supaya tidak ada dua versi yang
              membingungkan. Tulis README baru lima baris saja: nama proyek, URL
              situsmu, cara menjalankannya, dan apa yang kamu ubah. Simpan
              password di pengelola password, bukan di dalam repo — dan pastikan
              .env.local, .data/, serta .netlify/ tetap ada di .gitignore.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-4">
              <Link to="/" className={buttonVariants()}>
                Lihat arsip lowongannya <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
              <Link to="/panduan" className={buttonVariants({ variant: 'outline' })}>
                Balik ke panduan mahasiswa
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
