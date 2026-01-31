// State Management
import { ROLES } from './config.js';

class AppState {
  constructor() {
    this.currentRole = ROLES.GUEST;
    this.activeBorrows = [];
    this.books = [];
    this.borrowHistory = [];
  }

  setRole(role) {
    this.currentRole = role;
  }

  getRole() {
    return this.currentRole;
  }

  setActiveBorrows(borrows) {
    this.activeBorrows = borrows.map(b => b.bookId);
  }

  getActiveBorrows() {
    return this.activeBorrows;
  }

  isBookBorrowed(bookId) {
    return this.activeBorrows.includes(bookId);
  }

  setBooks(books) {
    this.books = books;
  }

  getBooks() {
    return this.books;
  }

  setBorrowHistory(history) {
    this.borrowHistory = history;
  }

  getBorrowHistory() {
    return this.borrowHistory;
  }
}

export const appState = new AppState();