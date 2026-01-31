// Modal UI Component
import { borrowBook } from '../api/borrow.js';
import { showToast } from './utils.js';
import { loadBooks } from './books.js';
import { fetchMyActiveBorrows } from '../api/borrow.js';
import { appState } from '../state.js';

let currentMap = null;
let currentMarker = null;
let currentPosition = null;
let currentBookData = null;

export function showBorrowConfirmationModal(book, position) {
  currentPosition = position;
  currentBookData = book;
  
  const modal = createModalElement(book, position);
  document.body.appendChild(modal);
  
  // Initialize map after modal is in DOM
  setTimeout(() => {
    initializeMap(position);
  }, 100);
}

function createModalElement(book, position) {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.id = 'borrow-modal';
  
  modal.innerHTML = `
    <div class="modal-container">
      <div class="modal-header">
        <h3>
          <i class="ph ph-book-open"></i>
          Konfirmasi Peminjaman
        </h3>
        <button class="modal-close" onclick="closeBorrowModal()">
          <i class="ph ph-x"></i>
        </button>
      </div>
      
      <div class="modal-body">
        <div class="modal-book-info">
          <h4>${escapeHtml(book.title)}</h4>
          <p>oleh ${escapeHtml(book.author)}</p>
        </div>
        
        <div class="map-container">
          <div id="borrow-map"></div>
        </div>
        
        <div class="location-info-detail">
          <h4>
            <i class="ph ph-map-pin"></i>
            Informasi Lokasi
          </h4>
          <div class="info-row">
            <span class="info-label">Latitude:</span>
            <span class="info-value">${position.latitude.toFixed(6)}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Longitude:</span>
            <span class="info-value">${position.longitude.toFixed(6)}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Akurasi:</span>
            <span class="info-value">${position.accuracy ? position.accuracy.toFixed(0) + 'm' : 'N/A'}</span>
          </div>
        </div>
        
        <div style="background: #fef3c7; padding: 1rem; border-radius: 8px; border-left: 4px solid #f59e0b;">
          <p style="margin: 0; color: #78350f; font-size: 0.9rem;">
            <i class="ph ph-warning" style="font-size: 1.2rem; vertical-align: middle;"></i>
            <strong>Perhatian:</strong> Lokasi Anda akan dicatat saat meminjam buku ini.
          </p>
        </div>
      </div>
      
      <div class="modal-footer">
        <button class="btn" style="background: linear-gradient(135deg, #6b7280, #4b5563);" onclick="closeBorrowModal()">
          <i class="ph ph-x-circle"></i> Batal
        </button>
        <button class="btn btn-borrow" onclick="confirmBorrow()">
          <i class="ph ph-check-circle"></i> Konfirmasi Pinjam
        </button>
      </div>
    </div>
  `;
  
  // Close on overlay click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeBorrowModal();
    }
  });
  
  return modal;
}

function initializeMap(position) {
  const mapElement = document.getElementById('borrow-map');
  
  if (!mapElement) return;
  
  // Check if Leaflet is available
  if (typeof L !== 'undefined') {
    // Initialize Leaflet map
    currentMap = L.map('borrow-map').setView([position.latitude, position.longitude], 15);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(currentMap);
    
    currentMarker = L.marker([position.latitude, position.longitude]).addTo(currentMap)
      .bindPopup('Lokasi Anda')
      .openPopup();
  } else {
    // Fallback: Show static map or placeholder
    mapElement.innerHTML = `
      <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: #f3f4f6; flex-direction: column; gap: 1rem;">
        <i class="ph ph-map-pin" style="font-size: 3rem; color: #6366f1;"></i>
        <div style="text-align: center;">
          <p style="margin: 0; font-weight: 600; color: #374151;">Lokasi Anda</p>
          <p style="margin: 0.25rem 0 0 0; font-size: 0.9rem; color: #6b7280;">
            ${position.latitude.toFixed(6)}, ${position.longitude.toFixed(6)}
          </p>
        </div>
        <a href="https://www.google.com/maps?q=${position.latitude},${position.longitude}" 
           target="_blank" 
           style="color: #6366f1; text-decoration: none; font-size: 0.9rem;">
          <i class="ph ph-arrow-square-out"></i> Buka di Google Maps
        </a>
      </div>
    `;
  }
}

window.closeBorrowModal = function() {
  const modal = document.getElementById('borrow-modal');
  if (modal) {
    // Cleanup map
    if (currentMap) {
      currentMap.remove();
      currentMap = null;
    }
    currentMarker = null;
    
    modal.remove();
  }
};

window.confirmBorrow = async function() {
  if (!currentPosition || !currentBookData) {
    showToast('Data tidak lengkap', true);
    return;
  }
  
  const confirmBtn = document.querySelector('.modal-footer .btn-borrow');
  const originalText = confirmBtn.innerHTML;
  
  try {
    // Show loading
    confirmBtn.disabled = true;
    confirmBtn.innerHTML = '<i class="ph ph-circle-notch" style="animation: spin 1s linear infinite;"></i> Memproses...';
    
    await borrowBook(currentBookData.id, currentPosition.latitude, currentPosition.longitude);
    
    showToast(`Berhasil meminjam "${currentBookData.title}"!`);
    
    // Close modal
    closeBorrowModal();
    
    // Reload active borrows and books
    const borrows = await fetchMyActiveBorrows();
    appState.setActiveBorrows(borrows);
    loadBooks();
    
  } catch (err) {
    confirmBtn.disabled = false;
    confirmBtn.innerHTML = originalText;
    showToast(err.message, true);
  }
};

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}