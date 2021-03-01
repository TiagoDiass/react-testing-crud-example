import axios from 'axios';

const api = axios.create({
  baseURL: 'https://patients-simple-api.herokuapp.com/',
  validateStatus: (status) => status !== 500,
});

export default api;
