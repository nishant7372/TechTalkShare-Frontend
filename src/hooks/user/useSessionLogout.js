import { useState } from "react";
import { useDispatch } from "react-redux";
import axiosInstance from "../axios/axiosInstance";
import { setUser } from "../../features/authSlice";
import {
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
} from "../utils/gobalFunctions";

export const useSessionLogout = () => {
  const [isPending, setIsPending] = useState(false);
  const dispatch = useDispatch();

  const sessionLogout = async (id, active) => {
    setIsPending(true);
    const token = getItemFromLocalStorage("token");

    try {
      //session logout out by id

      const res = await axiosInstance.post(
        `/users/logout/${id}`,
        {},
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res) {
        if (active) {
          removeItemFromLocalStorage("token"); // delete token from localStorage
          dispatch(setUser(null)); // setting user null on logout action
        }
        return { ok: "Logout Successful" };
      } else {
        return { error: "Unable to Logout" };
      }
    } catch (err) {
      let error = "";
      if (err.response) {
        error = err?.response?.data?.message || "An error occurred.";
      } else if (err.request) {
        error = "Network error. Please try again later.";
      } else {
        error = "An error occurred. Please try again later.";
      }
      return { error };
    } finally {
      setIsPending(false);
    }
  };

  return { sessionLogout, isPending };
};
