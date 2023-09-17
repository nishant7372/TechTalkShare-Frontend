import { useState } from "react";
import axiosInstance from "./../axios/axiosInstance";
import { getItemFromLocalStorage } from "../utils/globalFunctions";

export const useLeetcodeScrape = () => {
  const [isPending, setIsPending] = useState(false);

  const leetcodeScrape = async (params) => {
    setIsPending(true);

    const token = getItemFromLocalStorage("token");

    try {
      const res = await axiosInstance.get(`/scrape`, {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      return res
        ? { ok: "Download Complete" }
        : { error: "Unable to Download Article" };
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

  return { leetcodeScrape, isPending };
};
