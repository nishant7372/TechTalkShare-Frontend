import { useState } from "react";
import axiosInstance from "../axiosInstance";

export const useDeleteAvatar = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const deleteAvatar = async () => {
    setError(null);
    setIsPending(true);
    const header = localStorage.getItem("token");

    try {
      const res = await axiosInstance.delete("/users/me/avatar", {
        headers: {
          Authorization: `Bearer ${header}`,
        },
      });

      if (!res) {
        throw new Error("Unable to delete avatar");
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

  return { deleteAvatar, error, isPending };
};
