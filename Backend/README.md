# Library System with Geolocation (UCP 1 Remedial)

Backend sederhana untuk manajemen perpustakaan yang memiliki fitur peminjaman berbasis lokasi, dibangun dengan Node.js, Express.js, dan Sequelize.

## Fitur
- **Public**: Melihat daftar buku.
- **Admin**: Menambah, mengupdate, dan menghapus buku (Auth via Header `x-user-role: admin`).
- **User**: Meminjam buku dengan mencatat lokasi (Auth via Header `x-user-role: user`).

## Teknologi
- Node.js
- Express.js
- Sequelize ORM
- MySQL
- Geolocation (simulation via input)

## Cara Menjalankan

1.  **Instalasi Dependensi**
    ```bash
    npm install
    ```

2.  **Konfigurasi Database**
    - Pastikan MySQL berjalan di localhost.
    - Buat database dengan nama `library_db` (atau sesuaikan di `config/database.js`).
    - Pastikan username/password MySQL sesuai (Default: `root` / ``).

3.  **Jalankan Server**
    ```bash
    node server.js
    ```
    Server akan berjalan di `http://localhost:3000`. Database akan otomatis disinkronisasi (tabel dibuat jika belum ada).

## API Endpoints

### 1. Get All Books
- **URL**: `/api/books`
- **Method**: `GET`
- **Response**: List of books

### 2. Add Book (Admin)
- **URL**: `/api/books`
- **Method**: `POST`
- **Header**: `x-user-role: admin`
- **Body**:
    ```json
    {
        "title": "Judul Buku",
        "author": "Penulis",
        "stock": 10
    }
    ```

### 3. Borrow Book (User)
- **URL**: `/api/borrow`
- **Method**: `POST`
- **Header**:
    - `x-user-role: user`
    - `x-user-id: 1`
- **Body**:
    ```json
    {
        "bookId": 1,
        "latitude": -6.123,
        "longitude": 106.123
    }
    ```

## Struktur Database
- **Books**: `id`, `title`, `author`, `stock`, `createdAt`, `updatedAt`
- **BorrowLogs**: `id`, `userId`, `bookId`, `borrowDate`, `latitude`, `longitude`, `createdAt`, `updatedAt`

