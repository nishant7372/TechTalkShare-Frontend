import axios from "axios";
import apiConstants from "../../constants/apiConstants";
import { getItemFromLocalStorage } from "../utils/globalFunctions";

const token = getItemFromLocalStorage("token");

const axiosInstance = axios.create({
  baseURL: apiConstants.BASE_URL,
  timeout: 60000, // 60 sec timeout
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json; charset=UTF-8",
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    console.log("REQUEST >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", config);
    return config;
  },
  function (error) {
    console.log("REQUEST ERROR >>>>>>>>>>>>>>>>>>>>>>>>>>>>>", error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    console.log("RESPONSE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", response);
    return response;
  },
  function (error) {
    console.log("RESPONSE ERROR >>>>>>>>>>>>>>>>>>>>>>>>>>>>>", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
