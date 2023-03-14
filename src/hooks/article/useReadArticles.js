import { useState } from "react";
import { useArticleContext } from "../context/useArticleContext";
import axiosInstance from "./../axios/axiosInstance";

export const useReadArticles = () => {
  const { dispatch } = useArticleContext();
  const [isPending, setIsPending] = useState(false);

  const readArticles = async (params) => {
    setIsPending(true);

    const token = localStorage.getItem("token");

    try {
      const res = await axiosInstance.get(`/articles`, {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      dispatch({ type: "ARTICLES", payload: res.data });

      return res ? { ok: true } : { error: "Unable to fetch Articles" };
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

  return { readArticles, isPending };
};
