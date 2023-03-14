import { useState } from "react";
import axiosInstance from "../axiosInstance";

export const useUpdateUser = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const updateUser = async (updates) => {
    setError(null);
    setIsPending(true);
    const header = localStorage.getItem("token");

    try {
      const res = await axiosInstance.patch("/users/me", updates, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${header}`,
        },
      });

      if (!res) {
        throw new Error("Unable to update");
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

  return { updateUser, error, isPending };
};
