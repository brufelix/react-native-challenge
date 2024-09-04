import axios from 'axios';
import { BASE_URL } from '@/constants/Envs';

const api = axios.create({
  baseURL: BASE_URL,
});

export { api };
