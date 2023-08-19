import { useState } from "react";
import axiosInstance from "../axios/axiosInstance";
import { getItemFromLocalStorage } from "../utils/gobalFunctions";

export const useGetUser = () => {
  const [isPending, setIsPending] = useState(false);

  const getUser = async (userName) => {
    setIsPending(true);
    const token = getItemFromLocalStorage("token");

    try {
      const res = await axiosInstance.get(`/user/${userName}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res
        ? { ok: true, user: res.data }
        : { error: { message: "Unable to Get User", status: 500 } };
    } catch (err) {
      let error = "";
      if (err.response) {
        error = err?.response?.data?.message || "An error occurred.";
      } else if (err.request) {
        error = "Network error. Please try again later.";
      } else {
        error = "An error occurred. Please try again later.";
      }
      return { error: { message: error, status: err.response.status } };
    } finally {
      setIsPending(false);
    }
  };

  return { getUser, isPending };
};
