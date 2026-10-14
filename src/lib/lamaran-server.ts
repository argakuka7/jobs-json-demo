import { createServerFn } from '@tanstack/react-start'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

export type Lamaran = {
  nama: string
  pesan: string
  jobId: string
  jobTitle: string
  waktu: string
  jawaban: Record<string, string>
}

/**
 * Penyimpanan lamaran punya dua mode:
 *
 * 1. Mode produksi — set UPSTASH_REDIS_REST_URL dan UPSTASH_REDIS_REST_TOKEN
 *    di .env.local. Lamaran tersimpan permanen di Upstash Redis.
 * 2. Mode belajar — tanpa env Upstash, lamaran ditulis ke .data/lamaran.json
 *    di folder proyek. Cukup untuk latihan lokal; file ini di-gitignore.
 */

const KEY = 'lamaran'
const FILE = join(process.cwd(), '.data', 'lamaran.json')

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN
const useRedis = Boolean(UPSTASH_URL && UPSTASH_TOKEN)

async function redis(command: string, ...args: string[]): Promise<unknown> {
  const res = await fetch(`${UPSTASH_URL}/${command}/${args.map(encodeURIComponent).join('/')}`, {
    headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` },
  })
  const json = (await res.json()) as { result?: unknown; error?: string }
  if (json.error) throw new Error(json.error)
  return json.result
}

function readFileStore(): Lamaran[] {
  try {
    if (!existsSync(FILE)) return []
    return JSON.parse(readFileSync(FILE, 'utf-8')) as Lamaran[]
  } catch {
    return []
  }
}

function writeFileStore(all: Lamaran[]): void {
  mkdirSync(join(process.cwd(), '.data'), { recursive: true })
  writeFileSync(FILE, JSON.stringify(all, null, 2), 'utf-8')
}

async function readLamaran(): Promise<Lamaran[]> {
  if (useRedis) {
    const raw = await redis('get', KEY)
    if (raw == null) return []
    return typeof raw === 'string' ? (JSON.parse(raw) as Lamaran[]) : (raw as Lamaran[])
  }
  return readFileStore()
}

export const submitLamaran = createServerFn({ method: 'POST' })
  .validator((data: Lamaran) => data)
  .handler(async ({ data }) => {
    const all = await readLamaran()
    all.push(data)
    if (useRedis) {
      await redis('set', KEY, JSON.stringify(all))
    } else {
      writeFileStore(all)
    }
    return { ok: true, total: all.length }
  })

export const getLamaran = createServerFn({ method: 'GET' }).handler(async () => {
  return readLamaran()
})

export const verifyAdmin = createServerFn({ method: 'POST' })
  .validator((pw: string) => pw)
  .handler(async ({ data }) => {
    // Tanpa env ADMIN_PASSWORD, dipakai kata sandi latihan. WAJIB diganti
    // lewat .env.local sebelum situs dipakai sungguhan — lihat README.
    const expected = process.env.ADMIN_PASSWORD || 'kelas2026'
    return { ok: data === expected }
  })
