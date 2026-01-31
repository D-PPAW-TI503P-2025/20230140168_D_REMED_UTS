// History UI
import { appState } from '../state.js';
import { fetchBorrowHistory as apiFetchBorrowHistory } from '../api/borrow.js';
import { showLoading, showError, showEmpty, formatDate, formatCoordinates } from './utils.js';

const borrowHistoryTableBody = document.querySelector('#borrow-history-table tbody');

export async function loadBorrowHistory() {
  showLoading(borrowHistoryTableBody, 'Memuat riwayat...');
  
  try {
    const logs = await apiFetchBorrowHistory();
    console.log('Borrow History Data:', logs); // Debug
    appState.setBorrowHistory(logs);
    renderHistory(logs);
  } catch (err) {
    console.error('Error loading history:', err); // Debug
    showError(borrowHistoryTableBody, 'Gagal memuat riwayat: ' + err.message);
  }
}

export function renderHistory(logs) {
  borrowHistoryTableBody.innerHTML = '';
  
  if (logs.length === 0) {
    borrowHistoryTableBody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align: center; padding: 3rem; color: #999;">
          <i class="ph ph-books" style="font-size: 3rem; display: block; margin-bottom: 1rem;"></i>
          Belum ada riwayat peminjaman
        </td>
      </tr>
    `;
    return;
  }

  logs.forEach((log, index) => {
    const row = createHistoryRow(log, index);
    borrowHistoryTableBody.appendChild(row);
  });
}

function createHistoryRow(log, index) {
  const row = document.createElement('tr');
  row.className = 'history-row';
  row.style.animationDelay = `${index * 0.05}s`;
  
  const status = log.returnDate ? 'Dikembalikan' : 'Dipinjam';
  const statusClass = log.returnDate ? 'status-returned' : 'status-borrowed';
  
  row.innerHTML = `
    <td class="td-center">
      <div class="id-badge">#${log.id}</div>
    </td>
    <td>
      <div class="user-info">
        <i class="ph ph-user-circle"></i>
        <span>User ${log.userId}</span>
      </div>
    </td>
    <td>
      <div class="book-info">
        <i class="ph ph-book"></i>
        <span>Book ${log.bookId}</span>
      </div>
    </td>
    <td>
      <div class="date-info">
        <i class="ph ph-calendar-check"></i>
        <span>${formatDate(log.borrowDate)}</span>
      </div>
    </td>
    <td>
      ${log.returnDate ? `
        <div class="date-info">
          <i class="ph ph-calendar-x"></i>
          <span>${formatDate(log.returnDate)}</span>
        </div>
      ` : '<span class="status-badge status-borrowed">Masih Dipinjam</span>'}
    </td>
    <td>
      <div class="location-info">
        <i class="ph ph-map-pin"></i>
        <span>${formatCoordinates(log.latitude, log.longitude)}</span>
      </div>
    </td>
    <td class="td-center">
      <span class="status-badge ${statusClass}">${status}</span>
    </td>
  `;
  
  return row;
}