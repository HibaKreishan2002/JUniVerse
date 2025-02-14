import axios from "axios";

const JuUniVerseAxios = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
});

// Attach token dynamically before each request
JuUniVerseAxios.interceptors.request.use(config => {
  const AUTH_TOKEN = sessionStorage.getItem('AUTH_TOKEN'); // Get token at request time
  if (AUTH_TOKEN) {
    config.headers.Authorization = `Bearer ${AUTH_TOKEN}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default JuUniVerseAxios;
