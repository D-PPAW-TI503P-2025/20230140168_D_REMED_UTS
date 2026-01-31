# Sistem Manajemen Perpustakaan (Library Management System)

Aplikasi web sederhana untuk meminjam buku dengan fitur geolokasi (Leaflet.js), dikembangkan menggunakan **Node.js (Backend)** dan **Vanilla JavaScript (Frontend)**.

## 📂 Struktur Folder
- **Backend/**: Server REST API (Express.js, SQLite/Sequelize).
- **Frontend/**: Antarmuka pengguna (HTML, CSS, JS).
- **Frontend/SS/**: Dokumentasi screenshot aplikasi.

## 🚀 Cara Menjalankan

### 1. Jalankan Backend
```bash
cd Backend
npm install
node server.js
```
Server berjalan di `http://localhost:3000`

### 2. Jalankan Frontend
```bash
cd Frontend
npm install
npm start
```
Akses web di `http://localhost:8080`

---

## 📸 Dokumentasi Screenshot (Folder `Frontend/SS`)

Berikut adalah penjelasan dan pratinjau dari file screenshot yang terdapat dalam folder `Frontend/SS`:

### 1. Public & User Flows

| File Screenshot | Keterangan |
| :--- | :--- |
| **TampilanWebGuest.png** | Halaman utama untuk tamu (Guest), menampilkan daftar buku yang tersedia. |
| **AllViewPublik.png** | Tampilan endpoint publik untuk melihat semua buku (API Response). |
| **ViewIDPublik.png** | Tampilan endpoint publik untuk melihat detail satu buku (API Response). |
| **TampilanWebUser.png** | Dashboard utama saat login sebagai User. |
| **PinjamBukuUser.png** | Bukti request peminjaman buku menggunakan Thunder Client/API. |
| **TampilanWebFlowPinjam1.png** | Flow Peminjaman (1): Modal konfirmasi awal saat tombol Pinjam diklik. |
| **TampilanWebFlowPinjam2.png** | Flow Peminjaman (2): User memilih lokasi pengantaran di Peta sebelum konfirmasi. |

### 2. Admin Management (Buku & Stok)

| File Screenshot | Keterangan |
| :--- | :--- |
| **TampilanWebDashboardAdmin.png** | Dashboard Admin dengan tombol aksi Edit dan Hapus pada setiap buku. |
| **TampilanWebTambahDataBukuAdmin.png** | Form UI untuk Admin menambahkan data buku baru. |
| **CreateDataAdmin.png** | Response sukses API saat Admin membuat data buku baru. |
| **EditDataAdmin.png** | Response sukses API saat Admin mengupdate data buku. |
| **DeleteDataAdmin.png** | Response sukses API saat Admin menghapus data buku. |
| **TampilanWebHapusBukuAdmin.png** | Tampilan modal konfirmasi penghapusan buku di Website. |
| **TampilanWebAfterHapusAdmin.png** | Tampilan daftar buku setelah data berhasil dihapus (stok/item berkurang). |

### 3. Admin History & Testing Logic

| File Screenshot | Keterangan |
| :--- | :--- |
| **TampilanWebRiwayatAdmin.png** | Tabel Riwayat Peminjaman di Admin Panel (termasuk koordinat lokasi). |
| **FlowPinjam1Admin.png** | Testing Flow Admin (1): Cek stok awal sebelum peminjaman. |
| **FlowPinjam2Admin.png** | Testing Flow Admin (2): Eksekusi peminjaman. |
| **FlowPinjam3Admin(BerhasilKurangStock).png** | Testing Flow Admin (3): Verifikasi stok berkurang otomatis setelah peminjaman. |
| **FlowPinjam4Admin.png** | Testing Flow Admin (4): Verifikasi log peminjaman masuk ke database. |

---

## 🛠️ Teknologi
- **Backend**: Node.js, Express, Sequelize, SQLite3.
- **Frontend**: HTML5, Vanilla CSS (Modern Glassmorphism), Vanilla JS.
- **Maps**: Leaflet.js (OpenStreetMap).
- **Icons**: Phosphor Icons.
