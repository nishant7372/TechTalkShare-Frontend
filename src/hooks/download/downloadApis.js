import { useState } from "react";
import { formatError } from "../utils/helperFunctions";
import axiosInstance from "./../axios/axiosInstance";

export const useGetDownloads = () => {
  const [isPending, setIsPending] = useState(false);

  const getDownloads = async (params) => {
    setIsPending(true);

    try {
      const res = await axiosInstance.get(`/downloads`, {
        params,
      });

      return res?.data;
    } catch (err) {
      return { error: formatError(err) };
    } finally {
      setIsPending(false);
    }
  };

  return { getDownloads, isPending };
};

export const useDeleteDownload = () => {
  const [isPending, setIsPending] = useState(false);

  const deleteDownload = async (id) => {
    setIsPending(true);

    try {
      const res = await axiosInstance.delete(`/downloads/${id}`);
      return res?.data;
    } catch (err) {
      return { error: formatError(err) };
    } finally {
      setIsPending(false);
    }
  };

  return { deleteDownload, isPending };
};

export const useWebScrape = () => {
  const [isPending, setIsPending] = useState(false);

  const webScrape = async (params) => {
    setIsPending(true);

    try {
      const res = await axiosInstance.get(`/scrape`, {
        params,
      });

      return res?.data;
    } catch (err) {
      return { error: formatError(err) };
    } finally {
      setIsPending(false);
    }
  };

  return { webScrape, isPending };
};
