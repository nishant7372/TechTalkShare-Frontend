import { useState } from "react";
import axiosInstance from "../axios/axiosInstance";
import { getItemFromLocalStorage } from "../utils/gobalFunctions";

export const useLogoutAllOther = () => {
  const [isPending, setIsPending] = useState(false);

  const logoutAllOther = async () => {
    setIsPending(true);
    const token = getItemFromLocalStorage("token");

    try {
      //user all other session log out
      const res = await axiosInstance.post(
        "/users/logoutAllOther",
        {},
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res ? { ok: "Logout Successful" } : { error: "Unable to Logout" };
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
  return { logoutAllOther, isPending };
};
