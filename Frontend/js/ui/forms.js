// Forms UI
import { addBook, updateBook } from '../api/books.js';
import { showToast } from './utils.js';
import { loadBooks } from './books.js';

const formContainer = document.getElementById('form-container');
const addBookForm = document.getElementById('add-book-form');
const formTitle = document.getElementById('form-title');
const bookIdInput = document.getElementById('book-id');

export function initFormHandlers() {
  const btnAddBook = document.getElementById('btn-add-book');
  const btnCancelAdd = document.getElementById('btn-cancel-add');
  
  if (btnAddBook) {
    btnAddBook.addEventListener('click', () => {
      openBookForm();
    });
  }
  
  if (btnCancelAdd) {
    btnCancelAdd.addEventListener('click', () => {
      closeBookForm();
    });
  }
  
  if (addBookForm) {
    addBookForm.addEventListener('submit', handleFormSubmit);
  }
}

export function openBookForm(book = null) {
  formContainer.classList.remove('hidden');
  formContainer.style.animation = 'fadeIn 0.3s ease-out';
  
  if (book) {
    formTitle.textContent = 'Edit Buku';
    bookIdInput.value = book.id;
    document.getElementById('title').value = book.title;
    document.getElementById('author').value = book.author;
    document.getElementById('stock').value = book.stock;
  } else {
    formTitle.textContent = 'Tambah Buku Baru';
    bookIdInput.value = '';
    addBookForm.reset();
  }
}

export function closeBookForm() {
  formContainer.classList.add('hidden');
  addBookForm.reset();
  bookIdInput.value = '';
}

async function handleFormSubmit(e) {
  e.preventDefault();
  
  const id = bookIdInput.value;
  const title = document.getElementById('title').value.trim();
  const author = document.getElementById('author').value.trim();
  const stock = parseInt(document.getElementById('stock').value);
  
  if (!title || !author || isNaN(stock) || stock < 0) {
    showToast('Mohon isi semua field dengan benar', true);
    return;
  }
  
  try {
    if (id) {
      await updateBook(id, { title, author, stock });
      showToast('Buku berhasil diupdate!');
    } else {
      await addBook({ title, author, stock });
      showToast('Buku berhasil ditambahkan!');
    }
    
    closeBookForm();
    loadBooks();
  } catch (err) {
    showToast('Gagal menyimpan buku: ' + err.message, true);
  }
}