import axios from 'axios';

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
