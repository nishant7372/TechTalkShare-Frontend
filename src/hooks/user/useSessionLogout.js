import { useState } from "react";
import { useAuthContext } from "./../context/useAuthContext";
import axiosInstance from "../axios/axiosInstance";

export const useSessionLogout = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const sessionLogout = async (id, active) => {
    setError(null);
    setIsPending(true);
    const token = localStorage.getItem("token");

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

      if (!res) {
        throw new Error("Unable to logout");
      }
      if (active) {
        localStorage.setItem("token", null); // delete token from localStorage
        dispatch({ type: "LOGOUT" });
      }
    } catch (error) {
      if (error.response) {
        setError(error?.response?.data?.message || "An error occurred.");
      } else if (error.request) {
        setError("Network error.");
      } else {
        setError("An error occurred.");
      }
    } finally {
      setIsPending(false);
    }
  };

  return { sessionLogout, error, isPending };
};
