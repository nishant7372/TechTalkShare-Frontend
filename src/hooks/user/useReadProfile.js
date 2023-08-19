import { useState } from "react";
import { useDispatch } from "react-redux";
import axiosInstance from "../axios/axiosInstance";
import { setAuthIsReady, setServerError } from "../../features/authSlice";
import { setError } from "../../features/alertSlice";
import {
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
} from "../utils/gobalFunctions";

export const useReadProfile = () => {
  const dispatch = useDispatch();
  const [isPending, setIsPending] = useState(false);

  const readProfile = async () => {
    const token = getItemFromLocalStorage("token");
    // if (!token) return;
    setIsPending(true);
    try {
      const res = await axiosInstance.get("/users/me", {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res) {
        dispatch(setAuthIsReady(res.data)); // dispatch auth_is_ready
        return { ok: "User Information Fetched" };
      } else {
        dispatch(setAuthIsReady(null));
        return { error: "Unable to Fetch User" };
      }
    } catch (error) {
      let err;
      if (error?.response?.status === 401) {
        removeItemFromLocalStorage("token"); //delete token from localStorage when not Authorized
        dispatch(setAuthIsReady(null));
        return dispatch(setError("You have been logged out!"));
      }
      dispatch(setServerError(true));
      if (error.response) {
        err = error?.response?.data?.message || "An error occurred.";
      } else if (error.request) {
        err = "Network error. Please try again later.";
      } else {
        err = "An error occurred. Please try again later.";
      }
      return { error: err };
    } finally {
      setIsPending(false);
    }
  };
  return { readProfile, isPending };
};
