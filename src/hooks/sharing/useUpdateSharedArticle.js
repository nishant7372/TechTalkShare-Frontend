import { useState } from "react";
import axiosInstance from "./../axios/axiosInstance";
import { getItemFromLocalStorage } from "../utils/gobalFunctions";

export const useUpdateSharedArticle = () => {
  const [isPending, setIsPending] = useState(false);

  const updateSharedArticle = async (id, updates) => {
    setIsPending(true);

    const token = getItemFromLocalStorage("token");

    try {
      const res = await axiosInstance.patch(`/shared/${id}`, updates, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      return res
        ? { ok: "Article Updated" }
        : { error: "Unable to update Article" };
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

  return { updateSharedArticle, isPending };
};
