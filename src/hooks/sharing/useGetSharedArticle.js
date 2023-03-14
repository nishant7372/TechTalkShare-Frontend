import { useState } from "react";
import axiosInstance from "../axiosInstance";

export const useGetSharedArticle = () => {
  const [isPending, setIsPending] = useState(false);

  const getSharedArticle = async (id) => {
    setIsPending(true);

    const header = localStorage.getItem("token");

    try {
      const res = await axiosInstance.get(`/shared/${id}`, {
        headers: {
          Authorization: `Bearer ${header}`,
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      return res
        ? { ok: true, data: res.data }
        : { error: "Unable to Read Article" };
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

  return { getSharedArticle, isPending };
};
