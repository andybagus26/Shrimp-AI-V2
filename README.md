# 🦐 Shrimpfy AI — Platform Deteksi Kualitas Udang Vaname

Platform berbasis **Kecerdasan Buatan (YOLOv8)** untuk mendeteksi kualitas, ukuran (sizing), berat, dan penyakit udang vaname secara real-time melalui kamera atau foto.

---

## 📋 Daftar Isi

- [Fitur Utama](#-fitur-utama)
- [Teknologi yang Digunakan](#️-teknologi-yang-digunakan)
- [Persyaratan Sistem](#-persyaratan-sistem)
- [Cara Instalasi](#-cara-instalasi)
- [Cara Menjalankan](#-cara-menjalankan)
- [Struktur Project](#-struktur-project)
- [Cara Menggunakan Aplikasi](#-cara-menggunakan-aplikasi)

---

## ✨ Fitur Utama

- 🔍 **Deteksi Penyakit AI** — Mendeteksi WSSV (White Spot), Black Gill Syndrome, dan komplikasi penyakit lainnya
- 📏 **Deteksi Size & Berat** — Estimasi ukuran (Size 40, 50, 60, 80...) dan berat per ekor udang secara otomatis
- 💰 **Estimasi Harga Pasar** — Rekomendasi harga jual per kg berdasarkan kualitas deteksi
- 📄 **Laporan PDF** — Download laporan hasil pemindaian dalam format PDF berlisensi
- 📊 **Dashboard Monitoring** — Riwayat scan dan analisis performa kolam
- 🛒 **Simulasi Transaksi** — Modul negosiasi harga dengan tengkulak

---

## 🛠️ Teknologi yang Digunakan

| Layer | Teknologi |
|---|---|
| **Frontend** | React 19, TypeScript, Vite, TailwindCSS |
| **Backend Gateway** | Node.js, Express, TypeScript |
| **AI Backend** | Python, Flask, YOLOv8 (Ultralytics) |
| **Computer Vision** | OpenCV, Pillow, NumPy |
| **AI Model** | `best penyakit.pt` (deteksi penyakit), `best size.pt` (deteksi sizing) |

---

## 💻 Persyaratan Sistem

Pastikan software berikut sudah terinstall di komputermu:

- **Python** `>= 3.10` → [Download Python](https://www.python.org/downloads/)
- **Node.js** `>= 18` → [Download Node.js](https://nodejs.org/)
- **npm** (otomatis ikut saat install Node.js)
- **Git** → [Download Git](https://git-scm.com/)

Cek versi dengan:
```bash
python3 --version
node --version
npm --version
```

---

## 📦 Cara Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/andybagus26/Shrimp-AI-V2.git
cd Shrimp-AI-V2
```

### 2. Install Dependency Frontend (Node.js)

```bash
npm install
```

### 3. Setup Python Virtual Environment

```bash
# Buat virtual environment
python3 -m venv venv

# Aktifkan virtual environment
# Mac / Linux:
source venv/bin/activate

# Windows:
venv\Scripts\activate
```

### 4. Install Dependency Python (di dalam venv)

```bash
pip install flask flask-cors ultralytics opencv-python-headless pillow numpy
```

> ⚠️ Proses ini membutuhkan waktu beberapa menit karena mengunduh PyTorch dan model Ultralytics (~500MB+).

### 5. Pastikan File Model AI Ada

Cek bahwa kedua file model YOLO ada di folder root project:
```
Shrimp-AI-V2/
├── best penyakit.pt   ← wajib ada
└── best size.pt       ← wajib ada
```

Jika file model tidak ada, hubungi developer untuk mendapatkan file `.pt` tersebut.

---

## 🚀 Cara Menjalankan

Kamu membutuhkan **2 terminal** yang berjalan bersamaan.

### Terminal 1 — Python Flask Backend (Model YOLO)

```bash
# Masuk ke folder project
cd Shrimp-AI-V2

# Aktifkan virtual environment
source venv/bin/activate   # Mac/Linux
# atau: venv\Scripts\activate  (Windows)

# Jalankan Flask server
python3 app.py
```

✅ Berhasil jika muncul:
```
Sedang memuat dua otak Shrimpfy AI...
* Running on http://127.0.0.1:8000
```

---

### Terminal 2 — Node.js Frontend (React + Vite)

Buka terminal **baru** (jangan tutup Terminal 1):

```bash
cd Shrimp-AI-V2

npm run dev
```

✅ Berhasil jika muncul:
```
Server running on http://localhost:3000
```

---

### Buka di Browser

```
http://localhost:3000
```

---

## 📁 Struktur Project

```
Shrimp-AI-V2/
├── app.py               # Python Flask server (YOLOv8 AI backend)
├── server.ts            # Node.js Express gateway (API proxy + Vite)
├── index.html           # Entry point HTML
├── package.json         # Dependency Node.js
├── vite.config.ts       # Konfigurasi Vite bundler
├── tsconfig.json        # Konfigurasi TypeScript
│
├── best penyakit.pt     # Model YOLOv8 deteksi penyakit
├── best size.pt         # Model YOLOv8 deteksi ukuran/sizing
│
├── src/                 # Source code React frontend
│   ├── App.tsx          # Root komponen dan router
│   ├── main.tsx         # Entry point React
│   ├── index.css        # Global styles
│   ├── types.ts         # TypeScript type definitions
│   ├── data.ts          # Data statis (FAQ, tabel perbandingan, dll)
│   └── components/
│       ├── LandingView.tsx    # Halaman landing/beranda
│       ├── AuthViews.tsx      # Login, Register, Pilih Akun
│       ├── CameraScan.tsx     # Fitur scan kamera AI (utama)
│       ├── AnalysisView.tsx   # Dashboard analisis performa
│       ├── MarketView.tsx     # Simulasi transaksi pasar
│       └── PricingView.tsx    # Halaman harga & paket
│
├── static/
│   └── uploads/         # Folder output gambar hasil anotasi YOLO
│
└── venv/                # Python virtual environment (jangan diedit)
```

---

## 📖 Cara Menggunakan Aplikasi

### 1. Daftar / Login
- Buka `http://localhost:3000`
- Klik **"Mulai Analisis Gratis"** untuk daftar akun baru
- Atau klik **"Masuk"** jika sudah punya akun
- Gunakan tombol **"Gunakan Akun Simulasi Cepat"** untuk demo instan

### 2. Pilih Mode Deteksi
Di halaman **Kamera AI**, pilih mode:
- **Deteksi Size & Sizing** → estimasi ukuran, berat, harga pasar
- **Deteksi Penyakit AI** → deteksi WSSV, Black Gill, dll

### 3. Upload Foto atau Gunakan Kamera
- Klik **"Buka Kamera Live"** untuk menggunakan webcam secara langsung
- Atau klik **"Unggah Foto Udang"** untuk upload dari galeri

### 4. Baca Hasil Diagnosis
Hasil akan menampilkan:
- Skor kesegaran (0–100%)
- Kelas ukuran (Size 40, 50, 60, 80...)
- Estimasi berat per ekor (gram)
- Status penyakit (Negatif / Positif + nama penyakit)
- Gambar hasil anotasi YOLO (bounding box / segmentasi)
- Rekomendasi harga jual per kg

### 5. Download Laporan PDF
Klik tombol **Download PDF** di modal detail riwayat untuk mengunduh laporan berlisensi.

---

## ⚙️ Cara Restart Ulang (jika error)

Jika ada masalah port sudah terpakai:

```bash
# Hentikan semua proses di port 3000 dan 8000
kill $(lsof -ti :3000) 2>/dev/null
kill $(lsof -ti :8000) 2>/dev/null

# Kemudian ulangi langkah "Cara Menjalankan" di atas
```

---

## ❓ Troubleshooting

| Masalah | Solusi |
|---|---|
| `Port 8000 is already in use` | Jalankan `kill $(lsof -ti :8000)` lalu coba lagi |
| `Port 3000 is already in use` | Jalankan `kill $(lsof -ti :3000)` lalu coba lagi |
| `ModuleNotFoundError: No module named 'cv2'` | Pastikan virtual environment aktif (`source venv/bin/activate`) |
| `No module named 'flask'` | Jalankan ulang `pip install flask flask-cors ultralytics opencv-python-headless pillow numpy` |
| Model YOLO tidak ditemukan | Pastikan `best penyakit.pt` dan `best size.pt` ada di folder root |
| Hasil scan pakai data simulasi (mock) | Flask server belum aktif — jalankan `python3 app.py` terlebih dahulu |

---

## 👨‍💻 Developer

**Shrimpfy AI** — Platform Kecerdasan Buatan untuk Optimasi Tambak Udang Vaname Indonesia

> © 2026 Shrimpfy AI. Hak Cipta Dilindungi Undang-Undang.
