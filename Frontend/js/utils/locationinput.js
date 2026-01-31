// Location Input Modal
import { CONFIG } from '../config.js';

let map = null;
let marker = null;

export function showLocationInputModal(book, onLocationConfirmed) {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.id = 'location-input-modal';

  modal.innerHTML = `
    <div class="modal-container" style="max-width: 600px; width: 90%;">
      <div class="modal-header">
        <h3>
          <i class="ph ph-map-pin"></i>
          Pilih Lokasi Peminjaman
        </h3>
        <button class="modal-close" onclick="closeLocationInputModal()">
          <i class="ph ph-x"></i>
        </button>
      </div>
      
      <div class="modal-body">
        <div class="modal-book-info">
          <h4>${escapeHtml(book.title)}</h4>
          <p>oleh ${escapeHtml(book.author)}</p>
        </div>
        
        <div class="map-container">
            <div id="map"></div>
        </div>
        
        <div style="background: #f3f4f6; padding: 0.75rem; border-radius: 8px; margin-bottom: 1rem;">
           <p style="margin: 0; font-size: 0.9rem; color: #4b5563;">
             <i class="ph ph-info"></i> Geser pin pada peta untuk menentukan lokasi presisi.
           </p>
        </div>

        <form id="location-input-form">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              <div>
                <label for="latitude-input">Latitude</label>
                <input type="number" id="latitude-input" class="input-glass" 
                       placeholder="-6.2088" step="any" required 
                       style="background: white; color: #1f2937;">
              </div>
              
              <div>
                <label for="longitude-input">Longitude</label>
                <input type="number" id="longitude-input" class="input-glass" 
                       placeholder="106.8456" step="any" required
                       style="background: white; color: #1f2937;">
              </div>
          </div>
          
          <div style="margin-top: 1rem;">
            <button type="button" class="btn" onclick="useCurrentLocation()" 
                    style="width: 100%; background: linear-gradient(135deg, #3b82f6, #2563eb); margin-bottom: 0.5rem;">
              <i class="ph ph-crosshair"></i> Gunakan Lokasi Saya Saat Ini
            </button>
          </div>
        </form>
      </div>
      
      <div class="modal-footer">
        <button class="btn" style="background: linear-gradient(135deg, #6b7280, #4b5563);" 
                onclick="closeLocationInputModal()">
          <i class="ph ph-x-circle"></i> Batal
        </button>
        <button class="btn btn-borrow" onclick="submitManualLocation()">
          <i class="ph ph-check-circle"></i> Konfirmasi & Pinjam
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Store callback
  window._locationCallback = onLocationConfirmed;

  // Initialize Map
  // Wait for animation frame to ensure DOM is rendered and layout is calculated
  requestAnimationFrame(() => {
    setTimeout(() => {
      initMap();
    }, 100);
  });

  // Close on overlay click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeLocationInputModal();
    }
  });
}

function initMap() {
  // Ensure container exists
  const mapElement = document.getElementById('map');
  if (!mapElement) {
    console.error("Map container not found!");
    return;
  }

  const defaultLat = -6.2088;
  const defaultLng = 106.8456;

  // Use existing inputs if available (re-opening modal case), else default
  let lat = defaultLat;
  let lng = defaultLng;

  // Check if map already initialized (shouldn't happen with remove() but safe check)
  if (map) {
    map.remove();
    map = null;
  }

  map = L.map('map').setView([lat, lng], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  marker = L.marker([lat, lng], { draggable: true }).addTo(map);

  // Sync marker drag to inputs
  marker.on('dragend', function (e) {
    const position = marker.getLatLng();
    updateInputs(position.lat, position.lng);
  });

  // Map click to move marker
  map.on('click', function (e) {
    marker.setLatLng(e.latlng);
    updateInputs(e.latlng.lat, e.latlng.lng);
  });

  // Input changes to move marker
  const latInput = document.getElementById('latitude-input');
  const lngInput = document.getElementById('longitude-input');

  const onInputChange = () => {
    const inputLat = parseFloat(latInput.value);
    const inputLng = parseFloat(lngInput.value);
    if (!isNaN(inputLat) && !isNaN(inputLng)) {
      marker.setLatLng([inputLat, inputLng]);
      map.flyTo([inputLat, inputLng], 13);
    }
  };

  latInput.addEventListener('change', onInputChange);
  lngInput.addEventListener('change', onInputChange);

  // Initial input update
  updateInputs(lat, lng);

  // Get real location if available
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      // Only update if user hasn't moved yet (simple check could be added)
      updateMapLocation(position.coords.latitude, position.coords.longitude);
    }, (err) => {
      console.log("Geolocation lookup failed", err);
    });
  }

  // Force map size update after a short delay to handle modal transition
  setTimeout(() => {
    map.invalidateSize();
  }, 300);
}

function updateInputs(lat, lng) {
  document.getElementById('latitude-input').value = lat.toFixed(6);
  document.getElementById('longitude-input').value = lng.toFixed(6);
}

function updateMapLocation(lat, lng) {
  if (map && marker) {
    marker.setLatLng([lat, lng]);
    map.setView([lat, lng], 15); // Zoom in closer on user location
    updateInputs(lat, lng);
  }
}

window.useCurrentLocation = function () {
  if (navigator.geolocation) {
    const btn = document.querySelector('button[onclick="useCurrentLocation()"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="ph ph-spinner ph-spin"></i> Mencari Lokasi...';

    navigator.geolocation.getCurrentPosition(
      (position) => {
        updateMapLocation(position.coords.latitude, position.coords.longitude);
        btn.innerHTML = originalText;
      },
      (error) => {
        alert('Gagal mengambil lokasi: ' + error.message);
        btn.innerHTML = originalText;
      },
      { enableHighAccuracy: true }
    );
  } else {
    alert('Browser Anda tidak mendukung Geolocation.');
  }
};

window.submitManualLocation = function () {
  const latInput = document.getElementById('latitude-input');
  const lngInput = document.getElementById('longitude-input');

  const lat = parseFloat(latInput.value);
  const lng = parseFloat(lngInput.value);

  if (isNaN(lat) || isNaN(lng)) {
    alert('Mohon input koordinat yang valid');
    return;
  }

  if (lat < -90 || lat > 90) {
    alert('Latitude harus antara -90 dan 90');
    return;
  }

  if (lng < -180 || lng > 180) {
    alert('Longitude harus antara -180 dan 180');
    return;
  }

  if (window._locationCallback) {
    window._locationCallback({
      latitude: lat,
      longitude: lng,
      accuracy: 0
    });
  }

  closeLocationInputModal();
};

window.closeLocationInputModal = function () {
  const modal = document.getElementById('location-input-modal');
  if (modal) {
    // Clean up map instance
    if (map) {
      map.remove();
      map = null;
    }
    modal.remove();
  }
  window._locationCallback = null;
};

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}