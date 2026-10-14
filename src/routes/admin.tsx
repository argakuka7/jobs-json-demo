import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, Inbox, Lock } from 'lucide-react'
import { useState } from 'react'

import { buttonVariants } from '@/components/ui/button'
import { getLamaran, verifyAdmin } from '@/lib/lamaran-server'
import { company, getJob } from '@/lib/jobs'

export const Route = createFileRoute('/admin')({
  component: Admin,
})

function Admin() {
  const [status, setStatus] = useState<'locked' | 'checking' | 'unlocked' | 'denied'>('locked')
  const [password, setPassword] = useState('')
  const [lamaran, setLamaran] = useState<Awaited<ReturnType<typeof getLamaran>>>([])

  const attemptLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('checking')
    const { ok } = await verifyAdmin({ data: password })
    if (!ok) {
      setStatus('denied')
      return
    }
    setLamaran(await getLamaran())
    setStatus('unlocked')
  }

  if (status !== 'unlocked') {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-cream-dim hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Kembali
          </Link>
          <div className="arch-card arch-pop p-7">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-cobalt">
                <Lock className="h-5 w-5" />
              </span>
              <div>
                <h1 className="font-serif text-lg">Lemari Lamaran</h1>
                <p className="text-sm text-ink-muted">Khusus {company.name}</p>
              </div>
            </div>
            <form onSubmit={attemptLogin} className="mt-6 space-y-4">
              <div>
                <label htmlFor="password" className="eyebrow mb-2 block">
                  Password Admin
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="field-input"
                />
              </div>
              {status === 'denied' && (
                <p className="text-sm text-destructive">Password salah. Coba lagi.</p>
              )}
              <button
                type="submit"
                className={`${buttonVariants()} w-full`}
                disabled={status === 'checking'}
              >
                {status === 'checking' ? 'Memeriksa...' : 'Buka lemari'}
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-cream-dim hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Kembali
          </Link>
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-cream-dim">
            {company.name} — Arsip Internal
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-cream-dim">
              Berkas masuk
            </p>
            <h1 className="mt-2 font-serif text-3xl">Daftar Lamaran</h1>
            <p className="mt-1 text-sm text-cream-dim">{lamaran.length} lamaran tercatat</p>
          </div>
        </div>

        {lamaran.length === 0 ? (
          <div className="arch-card mt-12 flex flex-col items-center gap-3 p-14 text-center">
            <Inbox className="h-10 w-10 text-cobalt" />
            <p className="text-sm text-ink-muted">
              Belum ada lamaran. Form di halaman lowongan akan mengirim data ke sini.
            </p>
          </div>
        ) : (
          <div className="reveal mt-8 space-y-5">
            {lamaran.map((item, i) => {
              const job = getJob(item.jobId)
              return (
                <div key={i} className="arch-card p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-ink/10 pb-3">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-[11px] font-bold text-ink-muted">
                        No. {String(i + 1).padStart(3, '0')}
                      </span>
                      <h2 className="font-serif text-lg">{item.nama}</h2>
                    </div>
                    <span className="font-mono text-xs text-ink-muted">
                      {item.jobTitle} · {new Date(item.waktu).toLocaleString('id-ID')}
                    </span>
                  </div>
                  <p className="mt-3.5 text-sm leading-relaxed">
                    <span className="eyebrow mr-2">Kenapa cocok</span>
                    <span className="text-ink">{item.pesan}</span>
                  </p>

                  {job?.assessment && job.assessment.length > 0 && (
                    <div className="mt-4 space-y-3 border-t border-ink/10 pt-4">
                      <p className="eyebrow">Jawaban Tugas Analisis</p>
                      {job.assessment.map((soal, j) => (
                        <div key={j} className="rounded-md bg-secondary p-4">
                          <p className="text-sm font-medium text-ink">
                            {j + 1}. {soal.pertanyaan}
                          </p>
                          <p className="mt-1 font-mono text-xs text-cobalt-deep">
                            {soal.kompetensi}
                          </p>
                          <p className="mt-2 whitespace-pre-wrap text-sm text-ink">
                            {item.jawaban?.[String(j)] || (
                              <em className="text-ink-muted">Tidak dijawab</em>
                            )}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
