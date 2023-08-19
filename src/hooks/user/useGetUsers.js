import { useState } from "react";
import axiosInstance from "../axios/axiosInstance";
import { getItemFromLocalStorage } from "../utils/gobalFunctions";

export const useGetUsers = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const getUsers = async () => {
    setError(null);
    setIsPending(true);
    const token = getItemFromLocalStorage("token");

    try {
      const res = await axiosInstance.get(`/users/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res) {
        throw new Error("Unable to get users");
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

  return { getUsers, error, isPending };
};
