import { useState } from "react";
import axiosInstance from "./../axios/axiosInstance";

export const useReadArticle = () => {
  const [isPending, setIsPending] = useState(false);

  const readArticle = async (id) => {
    setIsPending(true);

    const token = localStorage.getItem("token");

    try {
      const res = await axiosInstance.get(`/articles/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
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

  return { readArticle, isPending };
};
