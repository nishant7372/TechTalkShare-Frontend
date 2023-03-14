import { useState } from "react";
import axiosInstance from "../axios/axiosInstance";

export const useLogoutAllOther = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const logoutAllOther = async () => {
    setError(null);
    setIsPending(true);
    const token = localStorage.getItem("token");

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
      if (res.status !== 200) {
        throw new Error("could not complete logOut");
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

  return { logoutAllOther, error, isPending };
};
