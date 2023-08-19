import { useState } from "react";
import axiosInstance from "../axios/axiosInstance";
import { getItemFromLocalStorage } from "../utils/gobalFunctions";

export const useUpdateUser = () => {
  const [isPending, setIsPending] = useState(false);

  const updateUser = async (updates) => {
    setIsPending(true);
    const token = getItemFromLocalStorage("token");

    try {
      const res = await axiosInstance.patch("/users/me", updates, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      });

      return res ? { ok: "Update Successful" } : { error: "Unable to Update" };
    } catch (err) {
      let error = "";
      if (err.response) {
        error = err?.response?.data?.message || "An error occurred.";
      } else if (err.request) {
        error = "Network error. Please try again later.";
      } else {
        error = "An error occurred. Please try again later.";
      }
      return { error };
    } finally {
      setIsPending(false);
    }
  };

  return { updateUser, isPending };
};
