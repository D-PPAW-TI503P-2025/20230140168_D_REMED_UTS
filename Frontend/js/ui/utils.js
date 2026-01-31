// UI Utilities
import { CONFIG } from '../config.js';

export function showToast(message, isError = false) {
  const toastEl = document.getElementById('toast');
  toastEl.textContent = message;
  toastEl.style.borderLeft = isError ? '5px solid #ff416c' : '5px solid #4CAF50';
  toastEl.classList.remove('hidden');

  setTimeout(() => {
    toastEl.classList.add('hidden');
  }, CONFIG.TOAST_DURATION);
}

export function formatDate(dateString) {
  return new Date(dateString).toLocaleString('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function formatCoordinates(lat, long) {
  if (lat == null || long == null || isNaN(lat) || isNaN(long)) {
    return 'Lokasi Tidak Ada';
  }
  return `${Number(lat).toFixed(4)}, ${Number(long).toFixed(4)}`;
}

export function showLoading(element, message = 'Memuat...') {
  element.innerHTML = `<div style="text-align: center; padding: 2rem; color: #666;">${message}</div>`;
}

export function showError(element, message = 'Gagal memuat data') {
  element.innerHTML = `<div style="text-align: center; padding: 2rem; color: #ff416c;">${message}</div>`;
}

export function showEmpty(element, message = 'Tidak ada data') {
  element.innerHTML = `<div style="text-align: center; padding: 2rem; color: #999;">${message}</div>`;
}