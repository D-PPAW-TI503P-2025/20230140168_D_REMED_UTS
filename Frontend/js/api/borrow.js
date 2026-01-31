// Borrow API
import { CONFIG } from '../config.js';

export async function fetchMyActiveBorrows() {
  const response = await fetch(`${CONFIG.API_URL}/borrow/my-active`, {
    headers: {
      'x-user-role': 'user',
      'x-user-id': CONFIG.USER_ID
    }
  });
  if (!response.ok) throw new Error('Failed to fetch active borrows');
  return await response.json();
}

export async function fetchBorrowHistory() {
  const response = await fetch(`${CONFIG.API_URL}/borrow`, {
    headers: {
      'x-user-role': 'admin'
    }
  });
  if (!response.ok) throw new Error('Failed to fetch borrow history');
  return await response.json();
}

export async function borrowBook(bookId, latitude, longitude) {
  const response = await fetch(`${CONFIG.API_URL}/borrow`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-user-role': 'user',
      'x-user-id': CONFIG.USER_ID
    },
    body: JSON.stringify({ bookId, latitude, longitude })
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to borrow book');
  return data;
}

export async function returnBook(bookId) {
  const response = await fetch(`${CONFIG.API_URL}/borrow/return`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-user-role': 'user',
      'x-user-id': CONFIG.USER_ID
    },
    body: JSON.stringify({ bookId })
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to return book');
  return data;
}