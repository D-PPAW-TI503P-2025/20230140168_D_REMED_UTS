// Books API
import { CONFIG } from '../config.js';

export async function fetchBooks() {
  const response = await fetch(`${CONFIG.API_URL}/books`);
  if (!response.ok) throw new Error('Failed to fetch books');
  return await response.json();
}

export async function addBook(bookData) {
  const response = await fetch(`${CONFIG.API_URL}/books`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-user-role': 'admin'
    },
    body: JSON.stringify(bookData)
  });
  if (!response.ok) throw new Error('Failed to add book');
  return await response.json();
}

export async function updateBook(id, bookData) {
  const response = await fetch(`${CONFIG.API_URL}/books/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-user-role': 'admin'
    },
    body: JSON.stringify(bookData)
  });
  if (!response.ok) throw new Error('Failed to update book');
  return await response.json();
}

export async function deleteBook(id) {
  const response = await fetch(`${CONFIG.API_URL}/books/${id}`, {
    method: 'DELETE',
    headers: {
      'x-user-role': 'admin'
    }
  });
  if (!response.ok) throw new Error('Failed to delete book');
  return await response.json();
}