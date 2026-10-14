# JobsJSON Demo — Situs Lowongan untuk Latihan Kelas

Template pembelajaran berupa situs lowongan dan lamaran kerja untuk
perusahaan fiktif **Nusantara Policy Lab**. Dibuat agar mahasiswa bisa
mengambil alih proyek sungguhan: mengubah tampilan, mengubah data,
lalu men-deploy-nya sendiri ke internet.

Tema visualnya disebut **Kartu Arsip**: halaman berupa alas felt hijau,
semua isi berupa kartu krem bergaris seperti kartu indeks, aksi dan
status memakai tinta kobal. Seluruh tema hidup di satu file, jadi ganti
rasa situs cukup dari satu tempat.

> Panduan langkah demi langkah untuk mahasiswa ada di halaman `/panduan`
> di dalam situs ini.

## Teknologi

| Lapisan    | Teknologi                                    |
| ---------- | -------------------------------------------- |
| Framework  | [TanStack Start](https://tanstack.com/start) (React 19 + Vite) |
| Routing    | TanStack Router (file-based, type-safe)      |
| Data       | TanStack Query + `data/jobs.json`            |
| Styling    | Tailwind CSS v4 + komponen ala shadcn/ui     |
| Simpan     | Upstash Redis (produksi) atau file `.data/` (latihan) |

## Mulai cepat

```bash
pnpm install
pnpm dev
```

Buka `http://localhost:8080`. Tanpa setup apa pun situs sudah jalan:
lamaran tersimpan di `.data/lamaran.json` (di-gitignore).

Untuk mode penuh, salin `.env.example` jadi `.env.local` lalu isi:

```bash
cp .env.example .env.local
```

| Variabel                  | Fungsi                                          |
| ------------------------- | ----------------------------------------------- |
| `UPSTASH_REDIS_REST_URL`  | Opsional. Kosongkan saat latihan.               |
| `UPSTASH_REDIS_REST_TOKEN`| Opsional. Pasangannya dengan URL di atas.       |
| `ADMIN_PASSWORD`          | Password `/admin`. Bawaan `kelas2026` — ganti!  |

## Mau mengubah apa? Buka file ini.

| File                                | Isinya                                              |
| ----------------------------------- | --------------------------------------------------- |
| `data/jobs.json`                    | Perusahaan, daftar lowongan, soal tugas analisis.   |
| `src/global-styles/tailwind.css`    | **Tema**: warna felt, kartu, tinta kobal, huruf.    |
| `src/routes/index.tsx`              | Beranda: hero, daftar lowongan, tentang, proses.    |
| `src/routes/jobs/$jobId.tsx`        | Halaman satu lowongan.                              |
| `src/routes/apply.$jobId.tsx`       | Form lamaran bertahap.                              |
| `src/routes/admin.tsx`              | Lemari lamaran (khusus pengajar).                   |
| `src/routes/panduan.tsx`            | Halaman panduan mahasiswa.                          |
| `src/lib/lamaran-server.ts`         | Penyimpanan lamaran (dua mode).                     |

Coba dulu: tambahkan satu lowongan baru di `jobs.json` tanpa menyentuh
kode. Kalau kartunya muncul sendiri di beranda, kamu sudah paham alurnya.

## Deploy

1. Push repo ini ke GitHub-mu.
2. Hubungkan ke Vercel atau Netlify, ikuti default-nya.
3. Isi tiga variabel env di atas di dasbor hosting. **Ganti
   `ADMIN_PASSWORD`** sebelum situs dipakai sungguhan.
4. Bersihkan: hapus repo lama dan README lama bila ada, supaya hanya ada
   satu sumber kebenaran.

## Perintah

```bash
pnpm dev         # jalan lokal di :8080
pnpm typecheck   # cek tipe
pnpm lint        # oxlint
pnpm test        # vitest
```

## Kredit

Dibangun di atas [tanstack-start-starter](https://github.com/AdiRishi/tanstack-start-starter).
Terima kasih untuk templatnya.
