import axios from 'axios';

// On récupère l'URL depuis l'environnement, ou on garde localhost par défaut
const baseURL = import.meta.env.VITE_APP_API_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: baseURL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;