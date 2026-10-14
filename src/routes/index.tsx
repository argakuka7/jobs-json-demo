import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, Briefcase, Clock, MapPin, Wallet } from 'lucide-react'

import { buttonVariants } from '@/components/ui/button'
import { company, jobs } from '@/lib/jobs'

export const Route = createFileRoute('/')({ component: Home })

const featured = jobs[0]

function Home() {
  return (
    <div className="min-h-screen">
      {/* ===== NAV ===== */}
      <header className="sticky top-0 z-10 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary font-mono text-sm font-bold text-primary-foreground">
              N
            </span>
            <span className="font-semibold">{company.name}</span>
          </Link>
          <nav className="hidden gap-6 text-sm text-cream-dim sm:flex">
            <a href="#lowongan" className="hover:text-foreground">Lowongan</a>
            <a href="#tentang" className="hover:text-foreground">Tentang</a>
            <a href="#proses" className="hover:text-foreground">Proses</a>
            <Link to="/panduan" className="hover:text-foreground">Panduan</Link>
          </nav>
          <a href="#lowongan" className={buttonVariants({ size: 'sm' })}>Daftar</a>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section className="mx-auto max-w-5xl px-6 pt-16 pb-20 sm:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-cream-dim">
              Arsip lowongan — {jobs.length} posisi terbuka
            </p>
            <h1 className="mt-5 font-serif text-4xl leading-[1.08] tracking-tight sm:text-6xl">
              {company.tagline}.
            </h1>
            <p className="mt-5 max-w-md text-lg text-cream-dim">
              Setiap lowongan kami catat rapi seperti arsip. Pilih satu,
              ambil kartunya, dan lamar langsung lewat form bertahap.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#lowongan" className={buttonVariants({ size: 'lg' })}>
                Lihat Lowongan <ArrowRight className="ml-1.5 h-4 w-4" />
              </a>
              <Link
                to="/panduan"
                className={`${buttonVariants({ size: 'lg' })} border-cream/45 bg-transparent text-cream hover:bg-cream/10`}
              >
                Cara Kerja Situs Ini
              </Link>
            </div>
          </div>

          {/* Kartu lowongan unggulan — benda asli yang bisa diklik */}
          {featured && (
            <Link
              to="/jobs/$jobId"
              params={{ jobId: featured.id }}
              className="arch-card arch-ruled arch-pop group block rotate-[0.5deg] p-6 transition-all duration-200 hover:-translate-y-1 hover:rotate-0 lg:col-span-5"
              style={{ '--rule-offset': '64px' } as React.CSSProperties}
            >
              <div className="flex items-baseline justify-between border-b border-ink/15 pb-3">
                <span className="eyebrow">Kartu Lowongan · No. 001</span>
                <span className="font-mono text-[10px] text-ink-muted">
                  {new Date().getFullYear()}
                </span>
              </div>
              <h2 className="mt-4 font-serif text-2xl leading-snug">{featured.title}</h2>
              <p className="eyebrow mt-2">{featured.department} · {featured.type}</p>
              <dl className="mt-5 space-y-2.5 font-mono text-[13px] text-ink">
                <div className="flex gap-3">
                  <dt className="w-20 shrink-0 font-bold text-cobalt-deep">LOKASI</dt>
                  <dd>{featured.location}</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="w-20 shrink-0 font-bold text-cobalt-deep">GAJI</dt>
                  <dd>{featured.salary}</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="w-20 shrink-0 font-bold text-cobalt-deep">TENGGAT</dt>
                  <dd>{featured.deadline}</dd>
                </div>
              </dl>
              <div className="mt-6 flex items-center justify-between">
                <span className="stamp">Terbuka</span>
                <span className="inline-flex items-center gap-1 font-mono text-xs font-bold text-cobalt-deep">
                  Lihat kartunya <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          )}
        </div>
      </section>

      {/* ===== LOWONGAN ===== */}
      <section id="lowongan" className="mx-auto max-w-5xl scroll-mt-20 px-6 py-14">
        <div className="mb-8">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-cream-dim">
            No. 01 — Daftar
          </p>
          <h2 className="mt-2 font-serif text-3xl">Lowongan Terbuka</h2>
          <p className="mt-1 text-sm text-cream-dim">Pilih peran yang cocok denganmu</p>
        </div>

        <div className="reveal grid gap-5 sm:grid-cols-2">
          {jobs.map((job, i) => (
            <Link
              key={job.id}
              to="/jobs/$jobId"
              params={{ jobId: job.id }}
              className="arch-card group flex flex-col p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.45)]"
            >
              <div className="flex items-center justify-between border-b border-ink/10 pb-2.5">
                <span className="font-mono text-[11px] font-bold text-ink-muted">
                  No. {String(i + 1).padStart(3, '0')}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-cobalt-deep">
                  {job.type}
                </span>
              </div>
              <h3 className="mt-4 font-serif text-xl leading-snug group-hover:text-cobalt-deep">
                {job.title}
              </h3>
              <p className="eyebrow mt-1.5">{job.department}</p>
              <p className="mt-3 line-clamp-2 text-sm text-ink-muted">{job.summary}</p>
              <div className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-4 font-mono text-xs text-ink-muted">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" /> {job.location}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Wallet className="h-3.5 w-3.5" /> {job.salary}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> {job.deadline}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== TENTANG ===== */}
      <section id="tentang" className="reveal scroll-mt-20 border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-cream-dim">
            No. 02 — Tentang
          </p>
          <h2 className="mt-2 font-serif text-3xl">Kenapa {company.name}?</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {[
              {
                icon: Briefcase,
                title: 'Dampak nyata',
                desc: 'Rekomendasi kami dipakai pemerintah daerah dan mitra internasional.',
              },
              {
                icon: ArrowRight,
                title: 'AI-first',
                desc: 'Kami memakai AI di seluruh alur kerja — dan kamu akan belajar itu.',
              },
              {
                icon: MapPin,
                title: 'Fleksibel',
                desc: 'Hybrid dan remote, dengan tim yang tersebar di seluruh Indonesia.',
              },
            ].map((item) => (
              <div key={item.title} className="arch-card p-6">
                <item.icon className="h-6 w-6 text-cobalt" />
                <h3 className="mt-4 font-serif text-lg">{item.title}</h3>
                <p className="mt-2 text-sm text-ink-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROSES ===== */}
      <section id="proses" className="reveal mx-auto max-w-5xl scroll-mt-20 px-6 pb-20 pt-4">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-cream-dim">
          No. 03 — Proses
        </p>
        <h2 className="mt-2 font-serif text-3xl">Proses Rekrutmen</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['1', 'Submit lamaran', 'Isi form dan kirim CV.'],
            ['2', 'Tugas analisis', 'Studi kasus kebijakan, 3 hari.'],
            ['3', 'Wawancara', 'Diskusi hasil tugas, 45 menit.'],
            ['4', 'Keputusan', 'Kabar dalam 1 minggu.'],
          ].map(([num, title, desc]) => (
            <div key={num} className="arch-card border-t-2 border-t-cobalt p-6">
              <span className="eyebrow">Langkah 0{num}</span>
              <h3 className="mt-3 font-serif text-lg">{title}</h3>
              <p className="mt-1.5 text-sm text-ink-muted">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-6 py-10 text-center">
          <p className="font-serif text-lg">{company.name}</p>
          <p className="text-sm text-cream-dim">{company.location}</p>
          <p className="font-mono text-xs text-cream-dim">
            © {new Date().getFullYear()} {company.name} — perusahaan fiktif untuk latihan kelas
          </p>
        </div>
      </footer>
    </div>
  )
}
