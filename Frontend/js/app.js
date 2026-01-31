// Main Application Entry Point
import { appState } from './state.js';
import { ROLES, ROLE_ICONS } from './config.js';
import { fetchMyActiveBorrows } from './api/borrow.js';
import { loadBooks } from './ui/books.js';
import { loadBorrowHistory } from './ui/history.js';
import { initFormHandlers } from './ui/forms.js';
import { watchPosition } from './utils/geolocation.js';

// DOM Elements
const roleSelect = document.getElementById('role-select');
const roleIcon = document.getElementById('role-icon');
const adminPanel = document.getElementById('admin-panel');
const locationInfo = document.getElementById('location-info');
const userCoordsUtil = document.getElementById('user-coords');
const booksContainer = document.getElementById('books-container');
const borrowHistoryContainer = document.getElementById('borrow-history-container');
const btnShowBooks = document.getElementById('btn-show-books');
const btnShowHistory = document.getElementById('btn-show-history');

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  init();
});

async function init() {
  // Initialize form handlers
  initFormHandlers();
  
  // Setup role change listener
  roleSelect.addEventListener('change', handleRoleChange);
  
  // Setup navigation buttons
  if (btnShowBooks) {
    btnShowBooks.addEventListener('click', () => {
      showBooksView();
    });
  }
  
  if (btnShowHistory) {
    btnShowHistory.addEventListener('click', () => {
      showHistoryView();
    });
  }
  
  // Initialize geolocation watcher
  initGeolocation();
  
  // Load initial data and update UI
  await loadInitialData();
  updateUI();
}

async function loadInitialData() {
  try {
    await loadBooks();
  } catch (err) {
    console.error('Failed to load initial data:', err);
  }
}

async function handleRoleChange(e) {
  const newRole = e.target.value;
  appState.setRole(newRole);
  
  if (newRole === ROLES.USER) {
    try {
      const borrows = await fetchMyActiveBorrows();
      appState.setActiveBorrows(borrows);
    } catch (err) {
      console.error('Failed to fetch active borrows:', err);
    }
  }
  
  updateUI();
  await loadBooks();
}

function updateUI() {
  const role = appState.getRole();
  
  // Update role icon
  roleIcon.innerHTML = `<i class="ph ${ROLE_ICONS[role]}"></i>`;
  
  // Update visibility based on role
  if (role === ROLES.ADMIN) {
    adminPanel.classList.remove('hidden');
    locationInfo.classList.add('hidden');
    showBooksView();
  } else if (role === ROLES.USER) {
    adminPanel.classList.add('hidden');
    locationInfo.classList.remove('hidden');
    showBooksView();
  } else {
    adminPanel.classList.add('hidden');
    locationInfo.classList.add('hidden');
    showBooksView();
  }
}

function showBooksView() {
  booksContainer.classList.remove('hidden');
  borrowHistoryContainer.classList.add('hidden');
  
  if (btnShowBooks) btnShowBooks.classList.add('active');
  if (btnShowHistory) btnShowHistory.classList.remove('active');
  
  loadBooks();
}

function showHistoryView() {
  booksContainer.classList.add('hidden');
  borrowHistoryContainer.classList.remove('hidden');
  
  if (btnShowBooks) btnShowBooks.classList.remove('active');
  if (btnShowHistory) btnShowHistory.classList.add('active');
  
  loadBorrowHistory();
}

function initGeolocation() {
  watchPosition(
    (coords) => {
      userCoordsUtil.textContent = `${coords.latitude.toFixed(4)}, ${coords.longitude.toFixed(4)}`;
    },
    (error) => {
      userCoordsUtil.textContent = 'Gagal mengambil lokasi';
      console.error('Geolocation error:', error);
    }
  );
}