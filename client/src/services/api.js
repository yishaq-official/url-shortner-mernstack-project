import axios from 'axios';

// 1. DYNAMIC URL SELECTION
// If we are in production (Vercel), use the environment variable.
// If the variable is missing (or we are local), fallback to localhost.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const API = axios.create({
  baseURL: API_URL,
});

// ... (keep the rest of your functions: shortenUrl, getAnalytics)
export const shortenUrl = async (originalUrl) => {
  const response = await API.post('/url', { url: originalUrl });
  return response.data;
};

export const getAnalytics = async (shortId) => {
  const response = await API.get(`/url/analytics/${shortId}`);
  return response.data;
};

export default API;