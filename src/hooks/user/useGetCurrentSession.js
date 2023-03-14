import { useState } from "react";
import { useAuthContext } from "./../useAuthContext";
import axiosInstance from "../axiosInstance";

export const useGetCurrentSession = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const getCurrentSession = async () => {
    setError(null);
    setIsPending(true);

    const header = localStorage.getItem("token");

    try {
      const res = await axiosInstance.get("/users/currentSession", {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${header}`,
        },
      });

      if (!res) {
        throw new Error("unable to get current session details");
      } else {
        dispatch({
          type: "CURRENT_SESSION",
          payload: res.data.session_id,
        });
      }
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
  return { getCurrentSession, error, isPending };
};
