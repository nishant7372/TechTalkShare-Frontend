import { useState } from "react";
import axiosInstance from "../axiosInstance";

export const useShareArticle = () => {
  const [isPending, setIsPending] = useState(false);

  const shareArticle = async (data) => {
    setIsPending(true);

    const header = localStorage.getItem("token");

    try {
      const res = await axiosInstance.post("/articles/share", data, {
        headers: {
          Authorization: `Bearer ${header}`,
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      return res
        ? { ok: "Article Shared" }
        : { error: "Unable to share Article" };
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

  return { shareArticle, isPending };
};
