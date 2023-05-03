import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_PROD_SERVER_URL,
  timeout: 8000,
});

export default axiosInstance;
