import axios from "axios";

const API_BASE_URL = "https://solaris-backend.vercel.app";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Always send cookies when possible
});

// Interceptor to add token from localStorage when needed
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor to handle token refresh or logout on 401 errors
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error is 401 and we haven't tried to refresh yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh the token
        const refreshResponse = await axios.post(
          `${API_BASE_URL}/api/user/refresh`,
          {},
          { withCredentials: true }
        );

        if (refreshResponse.data.token) {
          localStorage.setItem("token", refreshResponse.data.token);
          // Retry the original request with new token
          originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.token}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        // If refresh fails, redirect to login
        localStorage.removeItem("token");
        window.location.href = "/loginpage";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
