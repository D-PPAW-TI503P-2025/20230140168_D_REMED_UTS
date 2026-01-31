// Geolocation Utilities
import { CONFIG } from '../config.js';

export function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation tidak didukung browser ini'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        });
      },
      (error) => {
        let errorMessage = 'Gagal mengambil lokasi. ';
        
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage += 'Izinkan akses lokasi di browser Anda.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage += 'Informasi lokasi tidak tersedia.';
            break;
          case error.TIMEOUT:
            errorMessage += 'Request timeout. Coba lagi.';
            break;
          default:
            errorMessage += 'Error tidak diketahui.';
        }
        
        reject(new Error(errorMessage));
      },
      {
        enableHighAccuracy: false, // Changed to false for faster response
        timeout: 10000, // 10 seconds
        maximumAge: 60000 // 1 minute cache
      }
    );
  });
}

export function watchPosition(onSuccess, onError) {
  if (!navigator.geolocation) {
    if (onError) onError(new Error('Geolocation tidak didukung'));
    return null;
  }

  return navigator.geolocation.watchPosition(
    (position) => {
      onSuccess({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    },
    (error) => {
      if (onError) onError(error);
    },
    CONFIG.GEOLOCATION_OPTIONS
  );
}

export function clearWatch(watchId) {
  if (watchId && navigator.geolocation) {
    navigator.geolocation.clearWatch(watchId);
  }
}