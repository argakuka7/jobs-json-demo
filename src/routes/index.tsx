import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, Briefcase, Clock, MapPin, Wallet } from 'lucide-react'

import { buttonVariants } from '@/components/ui/button'
import { company, jobs } from '@/lib/jobs'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* ===== NAV ===== */}
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
              {company.name.charAt(0)}
            </span>
            <span className="font-semibold">{company.name}</span>
          </div>
          <nav className="hidden gap-6 text-sm text-muted-foreground sm:flex">
            <a href="#lowongan" className="hover:text-foreground">Lowongan</a>
            <a href="#tentang" className="hover:text-foreground">Tentang</a>
            <a href="#proses" className="hover:text-foreground">Proses</a>
          </nav>
          <a href="#lowongan" className={buttonVariants({ size: 'sm' })}>Daftar</a>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section className="mx-auto max-w-5xl px-6 pt-20 pb-16 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border bg-secondary px-4 py-1.5 text-xs font-medium text-secondary-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          {jobs.length} lowongan terbuka
        </span>
        <h1 className="mx-auto mt-6 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
          {company.tagline}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
          Bergabung dengan tim riset yang mengubah data dan regulasi menjadi
          kebijakan yang berdampak nyata.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <a href="#lowongan" className={buttonVariants({ size: 'lg' })}>
            Lihat Lowongan <ArrowRight className="ml-2 h-4 w-4" />
          </a>
          <a href="#tentang" className={buttonVariants({ variant: 'outline', size: 'lg' })}>
            Tentang Kami
          </a>
        </div>
      </section>

      {/* ===== LOWONGAN ===== */}
      <section id="lowongan" className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold">Lowongan Terbuka</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Pilih peran yang cocok denganmu
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {jobs.map((job) => (
            <Link
              key={job.id}
              to="/jobs/$jobId"
              params={{ jobId: job.id }}
              className="group rounded-xl border bg-card p-6 transition hover:border-primary/40 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold group-hover:text-primary">
                    {job.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{job.department}</p>
                </div>
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                  {job.type}
                </span>
              </div>
              <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{job.summary}</p>
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
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
      <section id="tentang" className="border-t bg-secondary/40">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="text-2xl font-bold">Kenapa {company.name}?</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
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
              <div key={item.title} className="rounded-xl border bg-card p-6">
                <item.icon className="h-6 w-6 text-primary" />
                <h3 className="mt-4 font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROSES ===== */}
      <section id="proses" className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-2xl font-bold">Proses Rekrutmen</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-4">
          {[
            ['1', 'Submit lamaran', 'Isi form dan kirim CV.'],
            ['2', 'Tugas analisis', 'Studi kasus kebijakan, 3 hari.'],
            ['3', 'Wawancara', 'Diskusi hasil tugas, 45 menit.'],
            ['4', 'Keputusan', 'Kabar dalam 1 minggu.'],
          ].map(([num, title, desc]) => (
            <div key={num} className="relative rounded-xl border bg-card p-6">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {num}
              </span>
              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-6 py-10 text-center text-sm text-muted-foreground">
          <p className="font-medium text-foreground">{company.name}</p>
          <p>{company.location} · {company.email}</p>
          <p className="text-xs">© 2026 {company.name} — perusahaan fiktif untuk latihan kelas</p>
        </div>
      </footer>
    </div>
  )
}
