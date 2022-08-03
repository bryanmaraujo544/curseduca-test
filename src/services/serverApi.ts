import axios from 'axios';

const apiUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080'
    : 'https://curseduca-api.herokuapp.com/';

export const serverApi = axios.create({
  baseURL: apiUrl,
});
