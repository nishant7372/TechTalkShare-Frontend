import { useState } from "react";
import axiosInstance from "../axiosInstance";
import { useSharingContext } from "../context/useSharingContext";

export const useGetSharedArticles = () => {
  const { dispatch } = useSharingContext();
  const [isPending, setIsPending] = useState(false);

  const getSharedArticles = async (params) => {
    setIsPending(true);

    const header = localStorage.getItem("token");

    try {
      const res = await axiosInstance.get("/shared", {
        params,
        headers: {
          Authorization: `Bearer ${header}`,
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      dispatch({ type: "SHARED_ARTICLES", payload: res.data });

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

  return { getSharedArticles, isPending };
};
