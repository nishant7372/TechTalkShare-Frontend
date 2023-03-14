import { useState } from "react";
import axiosInstance from "../axiosInstance";

export const useGetAvatar = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const getAvatar = async (id) => {
    setError(null);
    setIsPending(true);
    const header = localStorage.getItem("token");

    try {
      const res = await axiosInstance.get(`/users/${id}/avatar`, {
        headers: {
          Authorization: `Bearer ${header}`,
        },
      });

      if (!res) {
        throw new Error("Unable to get avatar");
      }
      return res;
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

  return { getAvatar, error, isPending };
};
