import { useState } from "react";
import { useAuthContext } from "./../context/useAuthContext";
import axiosInstance from "../axios/axiosInstance";

export const useDeleteAccount = () => {
  const { dispatch } = useAuthContext();
  const [isPending, setIsPending] = useState(false);

  const deleteAccount = async () => {
    setIsPending(true);
    const token = localStorage.getItem("token");

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
        localStorage.setItem("token", null); //delete token from localStorage
        dispatch({ type: "LOGOUT" }); //dispatch logout action
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
