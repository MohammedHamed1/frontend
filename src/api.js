import axios from 'axios';

const API_BASE = 'https://paypass-backend-five.vercel.app/api'; // Backend API base URL

export const api = axios.create({
  baseURL: API_BASE,
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Auth
export const login = (data) => api.post('/users/login', data);
export const signup = (data) => api.post('/users/signup', data);

// Data
export const getPackages = () => api.get('/packages');
export const getWashingPlaces = () => api.get('/washing-places');
export const getFeedbacks = () => api.get('/feedbacks');

// Payment
export const createPayment = (data) => api.post('/payments', data); 