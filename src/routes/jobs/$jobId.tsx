import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { ArrowLeft, Check, Clock, MapPin, Wallet } from 'lucide-react'

import { buttonVariants } from '@/components/ui/button'
import { company, getJob } from '@/lib/jobs'

export const Route = createFileRoute('/jobs/$jobId')({
  component: JobDetail,
})

function JobDetail() {
  const { jobId } = Route.useParams()
  const job = getJob(jobId)

  if (!job) {
    throw notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Kembali
          </Link>
          <span className="text-sm font-semibold">{company.name}</span>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-12">
        <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
          {job.department} · {job.type}
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{job.title}</h1>
        <p className="mt-3 text-lg text-muted-foreground">{job.summary}</p>

        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-4 w-4" /> {job.location}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Wallet className="h-4 w-4" /> {job.salary}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4" /> Deadline: {job.deadline}
          </span>
        </div>

        <div className="mt-8 flex gap-3">
          <Link
            to="/apply/$jobId"
            params={{ jobId: job.id }}
            className={buttonVariants({ size: 'lg' })}
          >
            Lamar Sekarang
          </Link>
          <a href="#tanggung-jawab" className={buttonVariants({ variant: 'outline', size: 'lg' })}>
            Lihat Detail
          </a>
        </div>

        <section id="tanggung-jawab" className="mt-12">
          <h2 className="text-xl font-bold">Tanggung Jawab</h2>
          <ul className="mt-4 space-y-3">
            {job.responsibilities.map((item) => (
              <li key={item} className="flex gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold">Kualifikasi</h2>
          <ul className="mt-4 space-y-3">
            {job.requirements.map((item) => (
              <li key={item} className="flex gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12 rounded-xl border bg-card p-6 text-center">
          <h2 className="text-lg font-bold">Tertarik melamar?</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Ikuti lamaran bertahap: data diri + tugas analisis.
          </p>
          <Link
            to="/apply/$jobId"
            params={{ jobId: job.id }}
            className={`${buttonVariants({ size: 'lg' })} mt-4`}
          >
            Lamar Sekarang
          </Link>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto max-w-3xl px-6 py-8 text-center text-sm text-muted-foreground">
          © 2026 {company.name} — perusahaan fiktif untuk latihan kelas
        </div>
      </footer>
    </div>
  )
}
