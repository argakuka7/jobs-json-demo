import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

import { buttonVariants } from '@/components/ui/button'

export const Route = createFileRoute('/panduan')({ component: Panduan })

const LANGKAH = [
  {
    no: '01',
    judul: 'Ambil alih proyek',
    isi: 'Salin repo ini ke akun GitHub-mu, lalu clone ke laptop. Pasang Node 22 dan pnpm, jalankan pnpm install, lalu pnpm dev. Situs terbuka di localhost:8080 tanpa setup lain.',
  },
  {
    no: '02',
    judul: 'Ubah sesukamu',
    isi: 'Semua isi lowongan ada di data/jobs.json. Semua warna dan huruf ada di src/global-styles/tailwind.css, bagian TEMA. Halaman-halaman ada di src/routes. Ubah, simpan, browser menyegarkan sendiri.',
  },
  {
    no: '03',
    judul: 'Deploy ke internet',
    isi: 'Push ke GitHub, lalu hubungkan repo ke Vercel atau Netlify. Isi env UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN, dan ADMIN_PASSWORD supaya lamaran tersimpan permanen. Tanpa itu bertahap, situs tetap jalan untuk dilihat.',
  },
  {
    no: '04',
    judul: 'Beres-beres',
    isi: 'Sudah aman di repo barumu? Hapus repo lama dan README lama supaya tidak ada dua versi yang membingungkan. Satu repo, satu README, satu sumber kebenaran.',
  },
]

const PETA = [
  ['data/jobs.json', 'Isi perusahaan, lowongan, dan soal tugas analisis.'],
  ['src/global-styles/tailwind.css', 'Tema: warna felt, kartu, tinta kobal, dan tiga peran huruf.'],
  ['src/routes/index.tsx', 'Beranda: hero, daftar lowongan, tentang, proses.'],
  ['src/routes/jobs/$jobId.tsx', 'Halaman satu lowongan (kartu arsip besar).'],
  ['src/routes/apply.$jobId.tsx', 'Form lamaran bertahap.'],
  ['src/routes/admin.tsx', 'Lemari lamaran untuk guru/pembuka kelas.'],
  ['src/lib/lamaran-server.ts', 'Penyimpanan lamaran: Upstash Redis atau file lokal.'],
]

function Panduan() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-cream-dim hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Beranda
          </Link>
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-cream-dim">
            Untuk mahasiswa
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-12">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-cream-dim">
          Dokumen kelas
        </p>
        <h1 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">
          Panduan praktis: ambil alih situs ini.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-cream-dim">
          Situs ini sengaja dibuat sederhana supaya bisa kamu bongkar. Empat
          langkah dari salinan sampai punya situs lowongan sendiri di internet.
        </p>

        <div className="reveal mt-10 grid gap-5 sm:grid-cols-2">
          {LANGKAH.map((l) => (
            <div key={l.no} className="arch-card border-t-2 border-t-cobalt p-6">
              <span className="eyebrow">Langkah {l.no}</span>
              <h2 className="mt-3 font-serif text-xl">{l.judul}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{l.isi}</p>
            </div>
          ))}
        </div>

        <section className="reveal mt-12">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-cream-dim">
            Peta proyek
          </p>
          <h2 className="mt-2 font-serif text-3xl">Mau mengubah apa? Buka file ini.</h2>
          <div className="arch-card mt-6 divide-y divide-ink/10">
            {PETA.map(([file, fungsi]) => (
              <div key={file} className="grid gap-1 px-6 py-4 sm:grid-cols-[auto_1fr] sm:gap-6">
                <code className="font-mono text-[13px] font-bold text-cobalt-deep">{file}</code>
                <p className="text-sm text-ink-muted">{fungsi}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="reveal mt-12">
          <div className="arch-card border-t-2 border-t-cobalt p-6 sm:p-8">
            <span className="eyebrow">Langkah 05 — opsional</span>
            <h2 className="mt-3 font-serif text-xl">Coba tantangan kecil</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              Tambahkan satu lowongan baru di jobs.json tanpa menyentuh kode.
              Kalau kartunya muncul sendiri di beranda, kamu sudah paham
              alurnya. Setelah itu coba ganti warna tinta kobal di tema dan
              lihat seluruh situs berganti nama rasanya.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-4">
              <Link to="/" className={buttonVariants()}>
                Lihat lagi arsip lowongannya
              </Link>
              <span className="stamp">Nol baris kode</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
