import { createServerFn } from '@tanstack/react-start'

export type Lamaran = {
  nama: string
  email: string
  pesan: string
  jobId: string
  jobTitle: string
  waktu: string
}

const URL = process.env.UPSTASH_REDIS_REST_URL!
const TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN!
const KEY = 'lamaran'

async function redis(command: string, ...args: string[]): Promise<unknown> {
  const res = await fetch(`${URL}/${command}/${args.map(encodeURIComponent).join('/')}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  })
  const json = (await res.json()) as { result?: unknown; error?: string }
  if (json.error) throw new Error(json.error)
  return json.result
}

async function readLamaran(): Promise<Lamaran[]> {
  const raw = await redis('get', KEY)
  return raw ? (JSON.parse(String(raw)) as Lamaran[]) : []
}

export const submitLamaran = createServerFn({ method: 'POST' })
  .validator((data: Lamaran) => data)
  .handler(async ({ data }) => {
    const all = await readLamaran()
    all.push(data)
    await redis('set', KEY, JSON.stringify(all))
    return { ok: true, total: all.length }
  })

export const getLamaran = createServerFn({ method: 'GET' }).handler(async () => {
  return readLamaran()
})

export const verifyAdmin = createServerFn({ method: 'POST' })
  .validator((pw: string) => pw)
  .handler(async ({ data }) => {
    const expected = process.env.ADMIN_PASSWORD
    return { ok: Boolean(expected) && data === expected }
  })
