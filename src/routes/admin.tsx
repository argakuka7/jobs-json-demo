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
      <div className="flex min-h-screen items-center justify-center bg-background px-6">
        <div className="w-full max-w-sm">
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Kembali
          </Link>
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <Lock className="h-5 w-5" />
              </span>
              <div>
                <h1 className="font-bold">Admin {company.name}</h1>
                <p className="text-sm text-muted-foreground">Masukkan password</p>
              </div>
            </div>
            <form onSubmit={attemptLogin} className="mt-6 space-y-4">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-3 focus:ring-ring/50"
              />
              {status === 'denied' && (
                <p className="text-sm text-destructive">Password salah. Coba lagi.</p>
              )}
              <button type="submit" className={`${buttonVariants()} w-full`} disabled={status === 'checking'}>
                {status === 'checking' ? 'Memeriksa...' : 'Masuk'}
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Kembali
          </Link>
          <span className="text-sm font-semibold">{company.name} — Admin</span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-bold">Daftar Lamaran</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {lamaran.length} lamaran masuk
            </p>
          </div>
        </div>

        {lamaran.length === 0 ? (
          <div className="mt-16 flex flex-col items-center gap-3 text-center text-muted-foreground">
            <Inbox className="h-10 w-10" />
            <p>Belum ada lamaran. Form di halaman detail lowongan akan mengirim data ke sini.</p>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {lamaran.map((item, i) => {
              const job = getJob(item.jobId)
              return (
                <div key={i} className="rounded-xl border bg-card p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h2 className="text-lg font-bold">{item.nama}</h2>
                    <span className="text-sm text-muted-foreground">
                      {item.jobTitle} · {new Date(item.waktu).toLocaleString('id-ID')}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Kenapa cocok: </span>
                    {item.pesan}
                  </p>

                  {job?.assessment && job.assessment.length > 0 && (
                    <div className="mt-4 space-y-3 border-t pt-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Jawaban Tugas Analisis
                      </p>
                      {job.assessment.map((soal, j) => (
                        <div key={j} className="rounded-lg bg-secondary/40 p-4">
                          <p className="text-sm font-medium">
                            {j + 1}. {soal.pertanyaan}
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">{soal.kompetensi}</p>
                          <p className="mt-2 whitespace-pre-wrap text-sm">
                            {item.jawaban?.[String(j)] || <em className="text-muted-foreground">Tidak dijawab</em>}
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
