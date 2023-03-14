import { useState } from "react";
import { useAuthContext } from "./../useAuthContext";
import axiosInstance from "./../axiosInstance";

export const useReadProfile = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const readProfile = async () => {
    if (localStorage.getItem("token") === "null") return;
    setError(null);
    setIsPending(true);
    const header = localStorage.getItem("token");
    try {
      const res = await axiosInstance.get("/users/me", {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${header}`,
        },
      });

      // dispatch auth_is_ready

      dispatch({ type: "AUTH_IS_READY", payload: res.data });
    } catch (error) {
      if (error?.response?.status === 401) {
        localStorage.setItem("token", null); //delete token from localStorage when not Authorized
        dispatch({ type: "AUTH_IS_READY", payload: null });
        alert("You have been logged out!");
      }
      dispatch({ type: "SERVER_ERROR" });
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
  return { readProfile, error, isPending };
};
