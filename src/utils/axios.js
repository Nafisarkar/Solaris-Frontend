import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://solaris-backend.vercel.app",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  // Add timeout and validate status
  timeout: 5000,
  validateStatus: (status) => status >= 200 && status < 500,
});

export default axiosInstance;
