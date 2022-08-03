import axios from 'axios';

const apiUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080'
    : 'http://localhost:8080';

export const serverApi = axios.create({
  baseURL: apiUrl,
});
