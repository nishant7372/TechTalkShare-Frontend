import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 30000, // 30 sec timeout
});

export default axiosInstance;
