import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuthIsReady, setServerError } from "../features/authSlice";
import { setError } from "../features/alertSlice";
import axiosInstance from "./axios/axiosInstance";
import {
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
} from "./utils/gobalFunctions";

const useOnRefresh = () => {
  const dispatch = useDispatch();

  const readProfile = async (token) => {
    try {
      const res = await axiosInstance.get("/users/me", {
        timeout: 60000, // 1 min wait
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      });
      // dispatch auth_is_ready
      dispatch(setAuthIsReady(res.data));
    } catch (err) {
      // when unauthorize delete token from localstorage
      if (err?.response?.status === 401) {
        const token = getItemFromLocalStorage("token");
        if (token) {
          removeItemFromLocalStorage("token"); //delete token from localStorage
          dispatch(setError("You have been logged out!"));
        }
        dispatch(setAuthIsReady(null));
      } else {
        dispatch(setServerError(true));
      }
    }
  };

  useEffect(() => {
    const token = getItemFromLocalStorage("token");
    // reading Profile when token is present
    if (token) readProfile(token);
    else dispatch(setAuthIsReady(null)); // dispatch auth_is_ready with user:null
  }, []);
};

export default useOnRefresh;
