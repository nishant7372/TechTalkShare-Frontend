import { useState } from "react";
import axiosInstance from "./../axios/axiosInstance";
import { formatError } from "../utils/helperFunctions";
import { setArticleCount, setArticles } from "../../features/sharingSlice";
import { useDispatch } from "react-redux";

export const useDeleteSharing = () => {
  const [isPending, setIsPending] = useState(false);

  const deleteSharing = async (id) => {
    setIsPending(true);

    try {
      const res = await axiosInstance.delete(`/sharing/${id}`);

      return res?.data;
    } catch (err) {
      return { error: formatError(err) };
    } finally {
      setIsPending(false);
    }
  };

  return { deleteSharing, isPending };
};

export const useGetSharedArticle = () => {
  const [isPending, setIsPending] = useState(false);

  const getSharedArticle = async (id) => {
    setIsPending(true);

    try {
      const res = await axiosInstance.get(`/shared/${id}`);
      return res?.data;
    } catch (err) {
      return {
        error: { message: formatError(err), status: err?.response?.status },
      };
    } finally {
      setIsPending(false);
    }
  };

  return { getSharedArticle, isPending };
};

export const useGetSharedArticles = () => {
  const dispatch = useDispatch();
  const [isPending, setIsPending] = useState(false);

  const getSharedArticles = async (params) => {
    setIsPending(true);
    try {
      const res = await axiosInstance.get("/shared", {
        params,
      });

      dispatch(setArticles(res?.data?.articles));
      dispatch(setArticleCount(res?.data?.articleCount));
    } catch (err) {
      return { error: formatError(err) };
    } finally {
      setIsPending(false);
    }
  };

  return { getSharedArticles, isPending };
};

export const useGetSharings = () => {
  const [isPending, setIsPending] = useState(false);

  const getSharings = async (id) => {
    setIsPending(true);

    try {
      const res = await axiosInstance.get(`/sharings/${id}`);

      return res?.data;
    } catch (err) {
      return {
        error: { message: formatError(err), status: err?.response?.status },
      };
    } finally {
      setIsPending(false);
    }
  };

  return { getSharings, isPending };
};

export const useShareArticle = () => {
  const [isPending, setIsPending] = useState(false);

  const shareArticle = async (data) => {
    setIsPending(true);

    try {
      const res = await axiosInstance.post("/articles/share", data);
      return res?.data;
    } catch (err) {
      return { error: formatError(err) };
    } finally {
      setIsPending(false);
    }
  };

  return { shareArticle, isPending };
};

export const useUpdateSharedArticle = () => {
  const [isPending, setIsPending] = useState(false);

  const updateSharedArticle = async (id, updates) => {
    setIsPending(true);

    try {
      const res = await axiosInstance.patch(`/shared/${id}`, updates);
      return res?.data;
    } catch (err) {
      return { error: formatError(err) };
    } finally {
      setIsPending(false);
    }
  };

  return { updateSharedArticle, isPending };
};

export const useUpdateSharing = () => {
  const [isPending, setIsPending] = useState(false);

  const updateSharing = async (id, updates) => {
    setIsPending(true);

    try {
      const res = await axiosInstance.patch(`/sharing/${id}`, updates);

      return res?.data;
    } catch (err) {
      return { error: formatError(err) };
    } finally {
      setIsPending(false);
    }
  };

  return { updateSharing, isPending };
};
