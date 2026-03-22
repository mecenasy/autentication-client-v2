import axios from 'axios';
import { authorizationHeaders } from './apiConfig';
import FingerprintJS, { Agent } from '@fingerprintjs/fingerprintjs';

let fpPromise: Promise<Agent>;

if (typeof window !== 'undefined') {
  fpPromise = FingerprintJS.load();
}

const axiosInstance = axios.create({
  responseType: 'json',
  withCredentials: true,
  headers: authorizationHeaders,
});

axiosInstance.defaults.withCredentials = true;

axiosInstance.interceptors.request.use(async (config) => {
  if (typeof window === 'undefined') {
    return config;
  }

  const fingerPrint = await fpPromise;
  const result = await fingerPrint.get();

  config.headers['x-fingerprint'] = result.visitorId;

  return config;
});

export default axiosInstance;
