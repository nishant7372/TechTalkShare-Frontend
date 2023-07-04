// useOnRefresh.js
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuthIsReady, setServerError } from "../features/authSlice";
import { setError } from "../features/alertSlice";
import axiosInstance from "./axios/axiosInstance";

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
        if (
          localStorage.getItem("token") !== "null" &&
          localStorage.getItem("token") !== null
        ) {
          localStorage.setItem("token", null); //delete token from localStorage
          dispatch(setError("You have been logged out"));
        }
        dispatch(setAuthIsReady(null));
      } else {
        dispatch(setServerError(true));
      }
    }
  };

  useEffect(() => {
    if (
      localStorage.getItem("token") !== "null" &&
      localStorage.getItem("token") !== null
    )
      readProfile(localStorage.getItem("token"));
    // reading Profile when token is present
    else dispatch(setAuthIsReady(null)); // dispatch auth_is_ready with user:null
  }, []);
};

export default useOnRefresh;
