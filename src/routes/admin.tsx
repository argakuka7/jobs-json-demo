import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, Inbox } from 'lucide-react'

import { getLamaran } from '@/lib/lamaran-server'
import { company } from '@/lib/jobs'

export const Route = createFileRoute('/admin')({
  component: Admin,
  loader: async () => {
    const lamaran = await getLamaran()
    return { lamaran }
  },
})

function Admin() {
  const { lamaran } = Route.useLoaderData()

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
          <div className="mt-8 overflow-x-auto rounded-xl border">
            <table className="w-full text-left text-sm">
              <thead className="border-b bg-secondary/50 text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Nama</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Lowongan</th>
                  <th className="px-4 py-3 font-medium">Waktu</th>
                  <th className="px-4 py-3 font-medium">Pesan</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {lamaran.map((item, i) => (
                  <tr key={i} className="align-top">
                    <td className="px-4 py-3 font-medium">{item.nama}</td>
                    <td className="px-4 py-3">
                      <a href={`mailto:${item.email}`} className="text-primary hover:underline">
                        {item.email}
                      </a>
                    </td>
                    <td className="px-4 py-3">{item.jobTitle}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                      {new Date(item.waktu).toLocaleString('id-ID')}
                    </td>
                    <td className="max-w-xs px-4 py-3 text-muted-foreground">{item.pesan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  )
}
