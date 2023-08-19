import { useState } from "react";
import axiosInstance from "../axios/axiosInstance";
import { getItemFromLocalStorage } from "../utils/gobalFunctions";

export const useDeleteAvatar = () => {
  const [isPending, setIsPending] = useState(false);

  const deleteAvatar = async () => {
    setIsPending(true);
    const token = getItemFromLocalStorage("token");

    try {
      const res = await axiosInstance.delete("/users/me/avatar", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res
        ? { ok: "Avatar Deleted Successfully" }
        : { error: "Unable to Delete Avatar" };
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

  return { deleteAvatar, isPending };
};
