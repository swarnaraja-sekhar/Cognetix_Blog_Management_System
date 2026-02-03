import axios from 'axios';

const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

const API = axios.create({
  baseURL: isLocalhost ? 'http://localhost:5000/api' : 'https://cognetix-blog-management-system.onrender.com/api',
});

// Add a request interceptor to attach the token
API.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
