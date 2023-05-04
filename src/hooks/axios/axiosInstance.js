import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://prostore-backend.onrender.com",
  timeout: 30000,
});

export default axiosInstance;
