import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight } from 'lucide-react'
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
      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="arch-card arch-pop w-full max-w-lg p-9 text-center">
          <span className="stamp text-sm">Lamaran tercatat</span>
          <h1 className="mt-5 font-serif text-3xl">Sudah masuk arsip.</h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted">
            Jawaban tugas analisismu kami simpan di berkas lamaran. Tim
            {` ${company.name}`} akan menghubungi kamu lewat email.
          </p>
          <Link to="/" className={`${buttonVariants()} mt-7`}>
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    )
  }

  const soal = step > 0 ? job.assessment?.[step - 1] : null

  return (
    <div className="min-h-screen">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-4">
          <Link
            to="/jobs/$jobId"
            params={{ jobId: job.id }}
            className="inline-flex items-center gap-2 text-sm text-cream-dim hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Batal
          </Link>
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-cream-dim">
            {company.name}
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-6 py-10">
        {/* ===== PROGRESS ===== */}
        <div className="mb-6">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-cream-dim">
            Berkas lamaran — langkah {step + 1} dari {totalSteps}
          </p>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-cream/15">
            <div
              className="h-full rounded-full bg-primary transition-all duration-300"
              style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* ===== KARTU ===== */}
        <div key={step} className="arch-card arch-pop p-6 sm:p-8">
          {step === 0 ? (
            <div className="space-y-6">
              <div>
                <span className="eyebrow">Formulir utama</span>
                <h1 className="mt-2 font-serif text-2xl">Lamaran — {job.title}</h1>
                <p className="mt-1.5 text-sm text-ink-muted">
                  Mulai dengan data diri singkat.
                </p>
              </div>
              <div>
                <label htmlFor="nama" className="eyebrow mb-2 block">
                  Nama Lengkap
                </label>
                <input
                  id="nama"
                  required
                  value={form.nama}
                  onChange={(e) => setForm({ ...form, nama: e.target.value })}
                  placeholder="Contoh: Siti Rahma"
                  className="field-input"
                />
              </div>
              <div>
                <label htmlFor="pesan" className="eyebrow mb-2 block">
                  Kenapa kamu cocok?
                </label>
                <textarea
                  id="pesan"
                  rows={4}
                  required
                  value={form.pesan}
                  onChange={(e) => setForm({ ...form, pesan: e.target.value })}
                  placeholder="Ceritakan singkat pengalaman dan ketertarikanmu di kebijakan publik..."
                  className="field-input resize-y"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              <span className="eyebrow">Tugas Analisis · {soal?.kompetensi}</span>
              <h1 className="font-serif text-2xl">Soal {step}</h1>
              <p className="leading-relaxed text-ink">{soal?.pertanyaan}</p>
              <p className="font-mono text-xs text-ink-muted">
                Maksimal {soal?.maks_kata} kata
              </p>
              <textarea
                id={`jawaban-${step - 1}`}
                rows={8}
                required
                value={jawaban[String(step - 1)] ?? ''}
                onChange={(e) =>
                  setJawaban((prev) => ({ ...prev, [String(step - 1)]: e.target.value }))
                }
                className="field-input resize-y"
              />
            </div>
          )}

          {/* ===== NAV ===== */}
          <div className="mt-7 flex items-center justify-between border-t border-ink/10 pt-5">
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
                Kirim & cap berkasnya
              </button>
            ) : (
              <button
                type="button"
                onClick={next}
                disabled={!canNext}
                className={buttonVariants()}
              >
                Berikutnya <ArrowRight className="ml-1.5 h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
