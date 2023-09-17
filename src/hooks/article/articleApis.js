import { useState } from "react";
import axiosInstance from "../axios/axiosInstance";
import { formatError } from "../utils/helperFunctions";
import { useDispatch } from "react-redux";
import { setArticleCount, setArticles } from "../../features/articleSlice";

export const useCreateArticle = () => {
  const [isPending, setIsPending] = useState(false);

  const createArticle = async (data) => {
    setIsPending(true);

    try {
      const res = await axiosInstance.post("/article", data);
      return res?.data;
    } catch (err) {
      return { error: formatError(err) };
    } finally {
      setIsPending(false);
    }
  };

  return { createArticle, isPending };
};

export const useReadArticle = () => {
  const [isPending, setIsPending] = useState(false);

  const readArticle = async (id) => {
    setIsPending(true);

    try {
      const res = await axiosInstance.get(`/article/${id}`);
      return res?.data;
    } catch (err) {
      return {
        error: { message: formatError(err), status: err?.response?.status },
      };
    } finally {
      setIsPending(false);
    }
  };

  return { readArticle, isPending };
};

export const useReadArticles = () => {
  const dispatch = useDispatch();

  const [isPending, setIsPending] = useState(false);

  const readArticles = async (params) => {
    setIsPending(true);

    try {
      const res = await axiosInstance.get(`/articles`, {
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

  return { readArticles, isPending };
};

export const useDeleteArticle = () => {
  const [isPending, setIsPending] = useState(false);

  const deleteArticle = async (id) => {
    setIsPending(true);
    try {
      const res = await axiosInstance.delete(`/article/${id}`);

      return res?.data;
    } catch (err) {
      return { error: formatError(err) };
    } finally {
      setIsPending(false);
    }
  };

  return { deleteArticle, isPending };
};

export const useUpdateArticle = () => {
  const [isPending, setIsPending] = useState(false);

  const updateArticle = async (id, updates) => {
    setIsPending(true);

    try {
      const res = await axiosInstance.patch(`/article/${id}`, updates);

      return res?.data;
    } catch (err) {
      return { error: formatError(err) };
    } finally {
      setIsPending(false);
    }
  };

  return { updateArticle, isPending };
};
