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

Berikut adalah penjelasan dari file-file screenshot yang ada di dalam folder `Frontend/SS`:

### 1. Public Access (Tanpa Login)
- **TampilanWebGuest.png & AllViewPublik.png**: Halaman utama yang bisa dilihat oleh tamu. Menampilkan daftar buku yang tersedia.
- **ViewIDPublik.png**: Respon API saat melihat detail satu buku secara publik.

### 2. User Mode (Peminjaman)
- **TampilanWebUser.png**: Dashboard saat login sebagai User.
- **PinjamBukuUser.png**: Proses request peminjaman via API (Thunder Client).
- **TampilanWebFlowPinjam1.png**: Modal konfirmasi peminjaman muncul saat klik "Pinjam".
- **TampilanWebFlowPinjam2.png**: User memilih lokasi pengantaran/peminjaman menggunakan Map interaktif.

### 3. Admin Mode (Manajemen Buku)
- **TampilanWebDashboardAdmin.png**: Halaman admin dengan kontrol penuh (Edit/Hapus).
- **TampilanWebTambahDataBukuAdmin.png**: Form untuk admin menambah stok buku baru.
- **CreateDataAdmin.png**: Bukti sukses request API tambah buku.
- **EditDataAdmin.png**: Bukti sukses request API update buku.
- **DeleteDataAdmin.png**: Bukti sukses request API hapus buku.
- **TampilanWebHapusBukuAdmin.png**: Tampilan modal konfirmasi hapus buku di web.
- **TampilanWebAfterHapusAdmin.png**: Daftar buku setelah salah satu buku dihapus.

### 4. Admin Mode (Riwayat & Log)
- **TampilanWebRiwayatAdmin.png**: Tabel riwayat peminjaman user, lengkap dengan status dan koordinat lokasi.
- **FlowPinjam1Admin.png s/d FlowPinjam4Admin.png**: Rangkaian flow testing API dari sisi Admin untuk memverifikasi logika peminjaman dan pengurangan stok.

---

## 🛠️ Teknologi
- **Backend**: Node.js, Express, Sequelize, SQLite3.
- **Frontend**: HTML5, Vanilla CSS (Modern Glassmorphism), Vanilla JS.
- **Maps**: Leaflet.js (OpenStreetMap).
- **Icons**: Phosphor Icons.
