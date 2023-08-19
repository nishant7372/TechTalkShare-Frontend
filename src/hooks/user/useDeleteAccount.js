import { useState } from "react";
import { useDispatch } from "react-redux";
import axiosInstance from "../axios/axiosInstance";
import { setUser } from "../../features/authSlice";
import {
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
} from "../utils/gobalFunctions";

export const useDeleteAccount = () => {
  const dispatch = useDispatch();
  const [isPending, setIsPending] = useState(false);

  const deleteAccount = async () => {
    setIsPending(true);
    const token = getItemFromLocalStorage("token");

    try {
      const res = await axiosInstance.delete("users/me", {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res) {
        return { error: "Unable to Delete Account" };
      } else {
        removeItemFromLocalStorage("token"); //delete token from localStorage
        dispatch(setUser(null)); // setting user null on logout
        return { ok: "Account Deleted Successful" };
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

  return { deleteAccount, isPending };
};
