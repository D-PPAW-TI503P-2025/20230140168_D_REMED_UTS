// Books UI
import { appState } from '../state.js';
import { ROLES } from '../config.js';
import { fetchBooks as apiFetchBooks, deleteBook } from '../api/books.js';
import { borrowBook, returnBook } from '../api/borrow.js';
import { getCurrentPosition } from '../utils/geolocation.js';
import { showToast, showLoading, showError, showEmpty } from './utils.js';
import { openBookForm } from './forms.js';

const booksGrid = document.getElementById('books-grid');

export async function loadBooks() {
  showLoading(booksGrid, 'Memuat daftar buku...');

  try {
    const books = await apiFetchBooks();
    appState.setBooks(books);
    renderBooks(books);
  } catch (err) {
    showError(booksGrid, 'Gagal memuat data. Pastikan backend berjalan di port 3000.');
  }
}

export function renderBooks(books) {
  booksGrid.innerHTML = '';

  if (books.length === 0) {
    showEmpty(booksGrid, 'Belum ada buku tersedia.');
    return;
  }

  books.forEach(book => {
    const card = createBookCard(book);
    booksGrid.appendChild(card);
  });
}

function createBookCard(book) {
  const card = document.createElement('div');
  card.className = 'book-card';

  const actionButton = createActionButton(book);

  card.innerHTML = `
    <div class="book-card-header">
      <div class="book-icon">📚</div>
      <div class="book-badge ${book.stock > 0 ? 'badge-available' : 'badge-unavailable'}">
        ${book.stock > 0 ? 'Tersedia' : 'Habis'}
      </div>
    </div>
    <h3 class="book-title">${escapeHtml(book.title)}</h3>
    <p class="book-author">oleh ${escapeHtml(book.author)}</p>
    <div class="book-footer">
      <div class="book-stock">
        <i class="ph ph-books"></i>
        Stok: <strong>${book.stock}</strong>
      </div>
      ${actionButton}
    </div>
  `;

  return card;
}

function createActionButton(book) {
  const role = appState.getRole();

  if (role === ROLES.ADMIN) {
    return `
      <div class="action-buttons">
        <button class="btn btn-sm btn-edit" onclick="handleEditBook(${book.id})">
          <i class="ph ph-pencil"></i> Edit
        </button>
        <button class="btn btn-sm btn-danger" onclick="handleDeleteBook(${book.id})">
          <i class="ph ph-trash"></i>
        </button>
      </div>
    `;
  } else if (role === ROLES.USER) {
    const isBorrowed = appState.isBookBorrowed(book.id);

    if (isBorrowed) {
      return `
        <button class="btn btn-sm btn-return" onclick="handleReturnBook(${book.id})">
          <i class="ph ph-arrow-u-up-left"></i> Kembali
        </button>
      `;
    } else if (book.stock > 0) {
      return `
        <button class="btn btn-sm btn-borrow" onclick="handleBorrowBook(${book.id})">
          <i class="ph ph-book-open"></i> Pinjam
        </button>
      `;
    } else {
      return `<span class="badge badge-unavailable">Habis</span>`;
    }
  }

  return '';
}

// Global handlers
window.handleEditBook = async function (bookId) {
  const books = appState.getBooks();
  const book = books.find(b => b.id === bookId);
  if (book) {
    openBookForm(book);
  }
};

window.handleDeleteBook = async function (bookId) {
  if (!confirm('Apakah anda yakin ingin menghapus buku ini?')) return;

  try {
    await deleteBook(bookId);
    showToast('Buku berhasil dihapus');
    loadBooks();
  } catch (err) {
    showToast('Gagal menghapus buku', true);
  }
};

window.handleBorrowBook = async function (bookId) {
  try {
    // Get book data first
    const books = appState.getBooks();
    const book = books.find(b => b.id === bookId);

    if (!book) {
      showToast('Buku tidak ditemukan', true);
      return;
    }

    // Check stock one more time safely
    if (book.stock <= 0) {
      showToast('Buku habis dipinjam', true);
      return;
    }

    // Always show Location Input Modal to let user see/adjust map
    // We import dynamically to avoid circular deps if any
    // Correct path is ../utils/locationinput.js (from js/ui/books.js)
    const { showLocationInputModal } = await import('../utils/locationinput.js');

    showLocationInputModal(book, async (inputPosition) => {
      // Callback when location is confirmed
      // Directly borrow here or show confirmation? 
      // User requested "menampilkan maps nya dulu, nah nanti baru ada konfirmasi pinjamnya"
      // The locationInput modal ALREADY has a "Konfirmasi & Pinjam" button.
      // So we can just call the borrow API directly from there or show a simplified confirmation.
      // Let's use the existing flow: Location Input -> (optional second confirmation) -> Borrow
      // OR: Location Modal -> Borrow.

      // Actually, the previous implementation of showLocationInputModal calls `onLocationConfirmed`.
      // Let's try to pass the borrow logic directly to it.

      try {
        const { borrowBook } = await import('../api/borrow.js');
        const { loadBooks } = await import('./books.js');
        const { fetchMyActiveBorrows } = await import('../api/borrow.js');

        showLoading(booksGrid, 'Memproses Peminjaman...'); // Optional UI feedback

        await borrowBook(book.id, inputPosition.latitude, inputPosition.longitude);

        showToast(`Berhasil meminjam "${book.title}"!`);

        // Reload data
        const borrows = await fetchMyActiveBorrows();
        appState.setActiveBorrows(borrows);
        loadBooks();

      } catch (err) {
        showToast(err.message, true);
      }
    });

  } catch (err) {
    console.error('Error in handleBorrowBook:', err);
    showToast(err.message, true);
  }
};

window.handleReturnBook = async function (bookId) {
  try {
    await returnBook(bookId);
    showToast('Buku berhasil dikembalikan');

    // Reload active borrows and books
    const { fetchMyActiveBorrows } = await import('../api/borrow.js');
    const borrows = await fetchMyActiveBorrows();
    appState.setActiveBorrows(borrows);
    loadBooks();
  } catch (err) {
    showToast(err.message, true);
  }
};

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}