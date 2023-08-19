import { useState } from "react";
import axiosInstance from "./../axios/axiosInstance";
import { useDispatch } from "react-redux";
import { setArticles, setArticleCount } from "../../features/articleSlice";
import { getItemFromLocalStorage } from "../utils/gobalFunctions";

export const useReadArticles = () => {
  const dispatch = useDispatch();

  const [isPending, setIsPending] = useState(false);

  const readArticles = async (params) => {
    setIsPending(true);

    const token = getItemFromLocalStorage("token");

    try {
      const res = await axiosInstance.get(`/articles`, {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      dispatch(setArticles(res.data.articles));
      dispatch(setArticleCount(res.data.articleCount));

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
