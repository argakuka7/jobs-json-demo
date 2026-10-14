import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { ArrowLeft, Check, Clock, MapPin, Wallet } from 'lucide-react'

import { buttonVariants } from '@/components/ui/button'
import { company, getJob, jobs } from '@/lib/jobs'

export const Route = createFileRoute('/jobs/$jobId')({
  component: JobDetail,
})

function JobDetail() {
  const { jobId } = Route.useParams()
  const job = getJob(jobId)

  if (!job) {
    throw notFound()
  }

  const serial = String(jobs.findIndex((j) => j.id === job.id) + 1).padStart(3, '0')

  return (
    <div className="min-h-screen">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-cream-dim hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Kembali ke arsip
          </Link>
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-cream-dim">
            {company.name}
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-12">
        <article className="arch-card arch-ruled arch-pop p-6 sm:p-9" style={{ '--rule-offset': '88px' } as React.CSSProperties}>
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/15 pb-4">
            <span className="eyebrow">Kartu Lowongan · No. {serial}</span>
            <span className="stamp">{job.deadline.replace('2026', '')}</span>
          </div>

          <h1 className="mt-6 font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
            {job.title}
          </h1>
          <p className="eyebrow mt-3">{job.department} · {job.type}</p>
          <p className="mt-4 text-lg leading-relaxed text-ink-muted">{job.summary}</p>

          <dl className="mt-6 grid gap-2.5 border-y border-ink/10 py-4 font-mono text-[13px] sm:grid-cols-3">
            <div className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cobalt" />
              <div>
                <dt className="text-[10px] font-bold text-cobalt-deep">LOKASI</dt>
                <dd>{job.location}</dd>
              </div>
            </div>
            <div className="flex gap-2">
              <Wallet className="mt-0.5 h-4 w-4 shrink-0 text-cobalt" />
              <div>
                <dt className="text-[10px] font-bold text-cobalt-deep">GAJI</dt>
                <dd>{job.salary}</dd>
              </div>
            </div>
            <div className="flex gap-2">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-cobalt" />
              <div>
                <dt className="text-[10px] font-bold text-cobalt-deep">TENGGAT</dt>
                <dd>{job.deadline}</dd>
              </div>
            </div>
          </dl>

          <section className="mt-8">
            <h2 className="font-serif text-xl">Tanggung Jawab</h2>
            <ul className="mt-4 space-y-3">
              {job.responsibilities.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-cobalt" />
                  <span className="text-ink">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="font-serif text-xl">Kualifikasi</h2>
            <ul className="mt-4 space-y-3">
              {job.requirements.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-cobalt" />
                  <span className="text-ink">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-10 rounded-md border border-ink/15 bg-secondary p-6 text-center">
            <h2 className="font-serif text-xl">Tertarik melamar?</h2>
            <p className="mt-1 text-sm text-ink-muted">
              Ikuti lamaran bertahap: data diri + tugas analisis.
            </p>
            <Link
              to="/apply/$jobId"
              params={{ jobId: job.id }}
              className={`${buttonVariants({ size: 'lg' })} mt-4`}
            >
              Ambil kartu ini & lamar
            </Link>
          </section>
        </article>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-3xl px-6 py-8 text-center font-mono text-xs text-cream-dim">
          © {new Date().getFullYear()} {company.name} — perusahaan fiktif untuk latihan kelas
        </div>
      </footer>
    </div>
  )
}
