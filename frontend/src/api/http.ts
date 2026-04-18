import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL ?? "http://localhost:5000/api";

export const http = axios.create({ baseURL });

http.interceptors.request.use((config) => {
  const token = localStorage.getItem("crm_access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const refreshToken = localStorage.getItem("crm_refresh_token");
    const isAuthError = error.response?.status === 401;
    const originalRequest = error.config as typeof error.config & { _retry?: boolean };

    if (isAuthError && refreshToken && !originalRequest._retry) {
      originalRequest._retry = true;
      const response = await axios.post(`${baseURL}/auth/refresh`, { refreshToken });
      localStorage.setItem("crm_access_token", response.data.accessToken);
      localStorage.setItem("crm_refresh_token", response.data.refreshToken);
      originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
      return http(originalRequest);
    }

    return Promise.reject(error);
  }
);
