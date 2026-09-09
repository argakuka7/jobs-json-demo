import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'

import { buttonVariants } from '@/components/ui/button'
import { company, getJob } from '@/lib/jobs'
import { submitLamaran } from '@/lib/lamaran-server'

export const Route = createFileRoute('/apply/$jobId')({
  component: Apply,
})

function Apply() {
  const { jobId } = Route.useParams()
  const job = getJob(jobId)

  if (!job) {
    throw notFound()
  }

  const totalSteps = 1 + (job.assessment?.length ?? 0)
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({ nama: '', pesan: '' })
  const [jawaban, setJawaban] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  const canNext =
    step === 0
      ? form.nama.trim() !== '' && form.pesan.trim() !== ''
      : (jawaban[String(step - 1)] ?? '').trim() !== ''

  const next = () => {
    if (step < totalSteps - 1) setStep((s) => s + 1)
  }
  const prev = () => {
    if (step > 0) setStep((s) => s - 1)
  }

  const submit = async () => {
    await submitLamaran({
      data: {
        nama: form.nama,
        pesan: form.pesan,
        jawaban,
        jobId: job.id,
        jobTitle: job.title,
        waktu: new Date().toISOString(),
      },
    })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-secondary/30 px-6">
        <div className="w-full max-w-lg rounded-xl border bg-card p-8 text-center shadow-sm">
          <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" />
          <h1 className="mt-4 text-2xl font-bold">Lamaran terkirim!</h1>
          <p className="mt-2 text-muted-foreground">
            Jawaban tugas analisismu sudah kami terima. Tim {company.name} akan
            menghubungi kamu.
          </p>
          <Link to="/" className={`${buttonVariants()} mt-6`}>
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    )
  }

  const soal = step > 0 ? job.assessment?.[step - 1] : null

  return (
    <div className="min-h-screen bg-secondary/30">
      <header className="border-b bg-background">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-4">
          <Link
            to="/jobs/$jobId"
            params={{ jobId: job.id }}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Batal
          </Link>
          <span className="text-sm font-semibold">{company.name}</span>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-6 py-8">
        {/* ===== PROGRESS ===== */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Langkah {step + 1} dari {totalSteps}
          </p>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* ===== KARTU ===== */}
        <div className="rounded-xl border bg-card p-6 shadow-sm sm:p-8">
          {step === 0 ? (
            <div className="space-y-5">
              <div>
                <h1 className="text-xl font-bold">Lamaran — {job.title}</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Mulai dengan data diri singkat.
                </p>
              </div>
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
            </div>
          ) : (
            <div className="space-y-4">
              <span className="inline-flex rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                Tugas Analisis · {soal?.kompetensi}
              </span>
              <h1 className="text-xl font-bold">Soal {step}</h1>
              <p className="text-foreground">{soal?.pertanyaan}</p>
              <p className="text-xs text-muted-foreground">Maksimal {soal?.maks_kata} kata</p>
              <textarea
                id={`jawaban-${step - 1}`}
                rows={8}
                required
                value={jawaban[String(step - 1)] ?? ''}
                onChange={(e) =>
                  setJawaban((prev) => ({ ...prev, [String(step - 1)]: e.target.value }))
                }
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/50"
              />
            </div>
          )}

          {/* ===== NAV ===== */}
          <div className="mt-6 flex items-center justify-between border-t pt-4">
            <button
              type="button"
              onClick={prev}
              disabled={step === 0}
              className={buttonVariants({ variant: 'outline' })}
            >
              Sebelumnya
            </button>
            {step === totalSteps - 1 ? (
              <button
                type="button"
                onClick={submit}
                disabled={!canNext}
                className={buttonVariants()}
              >
                Kirim Lamaran
              </button>
            ) : (
              <button
                type="button"
                onClick={next}
                disabled={!canNext}
                className={buttonVariants()}
              >
                Berikutnya <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
