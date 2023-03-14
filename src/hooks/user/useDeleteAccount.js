import { useState } from "react";
import { useAuthContext } from "./../context/useAuthContext";
import axiosInstance from "../axios/axiosInstance";

export const useDeleteAccount = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const deleteAccount = async () => {
    setError(null);
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
        throw new Error("Unable to delete Account");
      } else {
        localStorage.setItem("token", null); //delete token from localStorage
      }

      //dispatch logout action

      dispatch({ type: "LOGOUT" });
    } catch (error) {
      if (error.response) {
        setError(error?.response?.data?.message || "An error occurred.");
      } else if (error.request) {
        setError("Network error. Please try again later.");
      } else {
        setError("An error occurred. Please try again later.");
      }
    } finally {
      setIsPending(false);
    }
  };

  return { deleteAccount, error, isPending };
};
