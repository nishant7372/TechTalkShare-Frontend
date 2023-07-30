import axios from "axios";
import apiConstants from "../../constants/apiConstants";

const axiosInstance = axios.create({
  baseURL: apiConstants.BASE_URL,
  timeout: 60000, // 60 sec timeout
});

export default axiosInstance;
