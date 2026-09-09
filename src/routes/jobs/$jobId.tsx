import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { ArrowLeft, Check, CheckCircle2, Clock, MapPin, Wallet } from 'lucide-react'
import { useState } from 'react'

import { buttonVariants } from '@/components/ui/button'
import { company, getJob } from '@/lib/jobs'
import { submitLamaran } from '@/lib/lamaran-server'

export const Route = createFileRoute('/jobs/$jobId')({
  component: JobDetail,
})

function JobDetail() {
  const { jobId } = Route.useParams()
  const job = getJob(jobId)

  if (!job) {
    throw notFound()
  }

  const [form, setForm] = useState({ nama: '', pesan: '' })
  const [jawaban, setJawaban] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await submitLamaran({
      data: {
        ...form,
        jawaban,
        jobId: job.id,
        jobTitle: job.title,
        waktu: new Date().toISOString(),
      },
    })
    setSubmitted(true)
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
          <a href="#lamar" className={buttonVariants({ size: 'lg' })}>
            Lamar Sekarang
          </a>
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

        <section id="lamar" className="mt-12 rounded-xl border bg-card p-6">
          <h2 className="text-lg font-bold">Lamar Sekarang</h2>
          {submitted ? (
            <div className="mt-4 flex items-start gap-3 rounded-lg bg-emerald-50 p-4 text-sm text-emerald-800">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
              <div>
                <p className="font-semibold">Lamaran terkirim!</p>
                <p className="mt-1">
                  Data tersimpan di server. Tim kami akan menghubungi kamu.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-4 grid gap-4">
              <div>
                <label htmlFor="nama" className="mb-1.5 block text-sm font-medium">
                  Nama Lengkap
                </label>
                <input
                  id="nama"
                  required
                  value={form.nama}
                  onChange={(e) => setForm({ ...form, nama: e.target.value })}
                  placeholder="Contoh: Siti Rahma"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/50"
                />
              </div>
              <div>
                <label htmlFor="pesan" className="mb-1.5 block text-sm font-medium">
                  Kenapa kamu cocok?
                </label>
                <textarea
                  id="pesan"
                  rows={4}
                  required
                  value={form.pesan}
                  onChange={(e) => setForm({ ...form, pesan: e.target.value })}
                  placeholder="Ceritakan singkat pengalaman dan ketertarikanmu di kebijakan publik..."
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/50"
                />
              </div>

              {job.assessment && job.assessment.length > 0 && (
                <div className="space-y-4 rounded-lg border bg-secondary/30 p-4">
                  <div>
                    <h3 className="font-semibold">Tugas Analisis</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Jawab singkat dan jelas. Jawabanmu dinilai berdasarkan kompetensi
                      yang dicari untuk posisi ini.
                    </p>
                  </div>
                  {job.assessment.map((soal, i) => (
                    <div key={i}>
                      <label
                        htmlFor={`jawaban-${i}`}
                        className="mb-1.5 block text-sm font-medium"
                      >
                        {i + 1}. {soal.pertanyaan}
                        <span className="mt-0.5 block text-xs font-normal text-muted-foreground">
                          {soal.kompetensi} · maks {soal.maks_kata} kata
                        </span>
                      </label>
                      <textarea
                        id={`jawaban-${i}`}
                        rows={4}
                        required
                        value={jawaban[i] ?? ''}
                        onChange={(e) =>
                          setJawaban((prev) => ({ ...prev, [String(i)]: e.target.value }))
                        }
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/50"
                      />
                    </div>
                  ))}
                </div>
              )}

              <div>
                <button type="submit" className={buttonVariants({ size: 'lg' })}>
                  Kirim Lamaran
                </button>
              </div>
            </form>
          )}
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
