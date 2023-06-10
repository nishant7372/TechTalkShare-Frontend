import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_PROD_SERVER_URL,
  timeout: 30000, // 30 sec timeout
});

export default axiosInstance;
