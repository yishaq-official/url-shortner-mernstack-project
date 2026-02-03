import axios from 'axios';

// 1. Point to your Backend Server (Port 5000)
const API = axios.create({
  baseURL: 'http://localhost:5000',
});

// 2. Define the API calls
export const shortenUrl = async (originalUrl) => {
  // Sends POST to http://localhost:5000/url
  const response = await API.post('/url', { url: originalUrl });
  return response.data;
};

export const getAnalytics = async (shortId) => {
  // Sends GET to http://localhost:5000/url/analytics/xyz
  const response = await API.get(`/url/analytics/${shortId}`);
  return response.data;
};

export default API;