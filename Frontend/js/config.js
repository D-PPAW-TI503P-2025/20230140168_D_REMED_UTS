// Configuration and Constants
export const CONFIG = {
  API_URL: 'http://localhost:3000/api',
  USER_ID: '101',
  TOAST_DURATION: 3000,
  GEOLOCATION_OPTIONS: {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  }
};

export const ROLES = {
  GUEST: 'guest',
  USER: 'user',
  ADMIN: 'admin'
};

export const ROLE_ICONS = {
  [ROLES.GUEST]: 'ph-user-list',
  [ROLES.USER]: 'ph-user',
  [ROLES.ADMIN]: 'ph-shield-check'
};