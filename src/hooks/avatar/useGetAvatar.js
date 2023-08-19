import { useState } from "react";
import axiosInstance from "../axios/axiosInstance";
import { getItemFromLocalStorage } from "../utils/gobalFunctions";

export const useGetAvatar = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const getAvatar = async (id) => {
    setError(null);
    setIsPending(true);
    const token = getItemFromLocalStorage("token");

    try {
      const res = await axiosInstance.get(`/users/${id}/avatar`, {
        headers: {
          Authorization: `Bearer ${token}`,
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
