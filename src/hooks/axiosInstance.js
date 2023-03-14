import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://192.168.1.100:3000",
  timeout: 8000,
});

export default axiosInstance;
