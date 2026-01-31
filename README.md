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

### 1. Public & User Flows

| File Screenshot | Keterangan |
| :--- | :--- |
| ![Tampilan Guest](Frontend/SS/TampilanWebGuest.png) | Halaman utama untuk tamu (Guest), menampilkan daftar buku yang tersedia. |
| ![All View](Frontend/SS/AllViewPublik.png) | Tampilan endpoint publik untuk melihat semua buku (API Response). |
| ![View ID](Frontend/SS/ViewIDPublik.png) | Tampilan endpoint publik untuk melihat detail satu buku (API Response). |
| ![Web User](Frontend/SS/TampilanWebUser.png) | Dashboard utama saat login sebagai User. |
| ![Pinjam Buku](Frontend/SS/PinjamBukuUser.png) | Bukti request peminjaman buku menggunakan Thunder Client/API. |
| ![Flow Pinjam 1](Frontend/SS/TampilanWebFlowPinjam1.png) | Flow Peminjaman (1): Modal konfirmasi awal saat tombol Pinjam diklik. |
| ![Flow Pinjam 2](Frontend/SS/TampilanWebFlowPinjam2.png) | Flow Peminjaman (2): User memilih lokasi pengantaran di Peta sebelum konfirmasi. |

### 2. Admin Management (Buku & Stok)

| File Screenshot | Keterangan |
| :--- | :--- |
| ![Dashboard Admin](Frontend/SS/TampilanWebDashboardAdmin.png) | Dashboard Admin dengan tombol aksi Edit dan Hapus pada setiap buku. |
| ![Tambah Buku](Frontend/SS/TampilanWebTambahDataBukuAdmin.png) | Form UI untuk Admin menambahkan data buku baru. |
| ![Create API](Frontend/SS/CreateDataAdmin.png) | Response sukses API saat Admin membuat data buku baru. |
| ![Edit API](Frontend/SS/EditDataAdmin.png) | Response sukses API saat Admin mengupdate data buku. |
| ![Delete API](Frontend/SS/DeleteDataAdmin.png) | Response sukses API saat Admin menghapus data buku. |
| ![Konfirmasi Hapus](Frontend/SS/TampilanWebHapusBukuAdmin.png) | Tampilan modal konfirmasi penghapusan buku di Website. |
| ![Setelah Hapus](Frontend/SS/TampilanWebAfterHapusAdmin.png) | Tampilan daftar buku setelah data berhasil dihapus (stok/item berkurang). |

### 3. Admin History & Testing Logic

| File Screenshot | Keterangan |
| :--- | :--- |
| ![Riwayat Admin](Frontend/SS/TampilanWebRiwayatAdmin.png) | Tabel Riwayat Peminjaman di Admin Panel (termasuk koordinat lokasi). |
| ![Test Flow 1](Frontend/SS/FlowPinjam1Admin.png) | Testing Flow Admin (1): Cek stok awal sebelum peminjaman. |
| ![Test Flow 2](Frontend/SS/FlowPinjam2Admin.png) | Testing Flow Admin (2): Eksekusi peminjaman. |
| ![Test Flow 3](Frontend/SS/FlowPinjam3Admin(BerhasilKurangStock).png) | Testing Flow Admin (3): Verifikasi stok berkurang otomatis setelah peminjaman. |
| ![Test Flow 4](Frontend/SS/FlowPinjam4Admin.png) | Testing Flow Admin (4): Verifikasi log peminjaman masuk ke database. |

---

## 🛠️ Teknologi
- **Backend**: Node.js, Express, Sequelize, SQLite3.
- **Frontend**: HTML5, Vanilla CSS (Modern Glassmorphism), Vanilla JS.
- **Maps**: Leaflet.js (OpenStreetMap).
- **Icons**: Phosphor Icons.
