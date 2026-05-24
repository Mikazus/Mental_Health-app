# KicawCare

ID Konsep: KicawCare

KicawCare adalah platform konseling kesehatan mental mahasiswa yang menghubungkan pasien dan konselor dalam satu sistem terpadu, dengan screening berkala dan prioritas layanan berbasis tingkat stres.

## 1. Penjelasan Konsep Solusi
Fokus solusi:
- Deteksi awal kondisi mental melalui screening PHQ-9 dan GAD-7.
- Triage dan prioritas penanganan berdasarkan tingkat stres/risiko.
- Pendampingan berkelanjutan: antrean konselor, chat, jurnal, jadwal temu, hingga video call.
- AI sebagai asisten (bukan pengganti konselor) untuk memberi saran awal aman dan merangkum masalah pasien.
- Intervensi preventif untuk kondisi normal/ringan: self-help tools, wellness challenge, edukasi mental health.
- Re-screening mingguan otomatis untuk memantau perubahan kondisi.

## 2. Keterkaitan dengan Worksheet
Pemetaan ke worksheet:

| Komponen Worksheet | Implementasi di KicawCare |
|---|---|
| Problem Statement | Mahasiswa butuh akses konseling cepat, terukur, dan terprioritas |
| Stakeholder | Mahasiswa (pasien), konselor, admin kampus |
| User Journey | Login/registrasi → pilih peran → screening → hasil tingkat stres → antre/chat/jadwal → tindak lanjut |
| Functional Requirement | PHQ-9, GAD-7, antrean, chat, jurnal, jadwal, video call, AI summary/suggestion |
| Non-Functional Requirement | Privasi data, RBAC, audit log, notifikasi mingguan, reliabilitas |
| Data Requirement | Akun, skor screening, jurnal, antrean, sesi konseling, ringkasan AI |
| Output/Impact | Prioritas layanan jelas, pemerataan beban konselor, monitoring kondisi mahasiswa |

## 3. Penjelasan Arsitektur Sistem
Arsitektur monolitik berbasis Next.js dengan integrasi layanan eksternal:
- Client web (pasien/konselor) untuk login, screening, jurnal, chat, jadwal, video call.
- Backend Next.js (Server Actions dan Route Handlers) untuk autentikasi, scoring PHQ-9/GAD-7, dan manajemen antrean.
- PostgreSQL + Prisma untuk penyimpanan data utama.
- Pusher untuk realtime chat/queue.
- AI service (Gemini) untuk ringkasan dan saran awal yang aman.
- Integrasi Firebase (admin/client) untuk kebutuhan profil dan layanan pendukung sesuai konfigurasi.

## 4. Alur Utama
1. Masuk menggunakan email UB dan password, atau membuat akun.
2. Pilih peran sebagai konselor atau pasien.
3. Jika pasien, diarahkan ke screening PHQ-9 dan GAD-7.
4. Hasil screening menentukan tingkat stres mahasiswa (kemungkinan dibantu AI untuk analisis tambahan).
5. Jika sudah satu minggu, aplikasi otomatis meminta screening ulang.
6. Mahasiswa dikelompokkan berdasarkan tingkat stres.
7. Konselor melihat prioritas mahasiswa dari tingkat stres tertinggi.
8. Jika normal, diberikan self-help tools, wellness challenge, dan edukasi mental health.
9. Pasien tetap bisa mengantri untuk bimbingan konselor dengan menekan tombol.

## 5. Fitur Utama
- Antrean konselor.
- Chat konselor.
- Jurnal yang dapat dilihat konselor.
- AI untuk chat (bukan mengganti konselor, hanya memberi saran dan merangkum masalah pasien).
- Penjadwalan tanggal temu konselor.
- Pengelompokan tingkat stres.
- Self-help tools (panduan), wellness challenge (aktivitas), edukasi mental health (video atau game).
- Telepon video untuk sesi terjadwal.

## 6. Sistem Pemerataan Konselor
Sistem mengatur pemerataan beban pasien per konselor agar distribusi kasus lebih adil dan waktu tunggu lebih singkat.

## 7. Cara Menjalankan Proyek (Implementasi)
Kode aplikasi ada di folder [kicawcare](kicawcare).

### Prasyarat
- Node.js 20+
- Docker + Docker Compose (untuk PostgreSQL)
- PostgreSQL lokal (opsional jika tidak memakai Docker)

### Langkah Menjalankan
1. Masuk ke folder aplikasi:
   ```bash
   cd kicawcare
   ```
2. Instal dependensi:
   ```bash
   npm install
   ```
3. Jalankan PostgreSQL via Docker (opsional jika pakai DB lokal):
   ```bash
   docker compose up -d postgres
   ```
4. Siapkan environment variables sesuai kebutuhan. Minimal umumnya:
   - `DATABASE_URL`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` (untuk NextAuth)
   - `GEMINI_API_KEY`
   - `FIREBASE_ADMIN_PRIVATE_KEY` (jika fitur Firebase digunakan)
5. Jalankan migrasi Prisma:
   ```bash
   npx prisma db push
   ```
6. Jalankan aplikasi:
   ```bash
   npm run dev
   ```
7. Buka aplikasi di `http://localhost:3000`.
