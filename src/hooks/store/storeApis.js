import { useState } from "react";
import axiosInstance from "../axios/axiosInstance";
import { formatError } from "../utils/helperFunctions";

export const useGetRecents = () => {
  const [isPending, setIsPending] = useState(false);

  const getRecents = async (params) => {
    setIsPending(true);

    try {
      const res = await axiosInstance.get(`/recent`, {
        params,
      });
      return res?.data;
    } catch (err) {
      return { error: formatError(err) };
    } finally {
      setIsPending(false);
    }
  };

  return { getRecents, isPending };
};

export const useGetPinned = () => {
  const [isPending, setIsPending] = useState(false);

  const getPinned = async (params) => {
    setIsPending(true);

    try {
      const res = await axiosInstance.get(`/pinned`, {
        params,
      });
      return res?.data;
    } catch (err) {
      return { error: formatError(err) };
    } finally {
      setIsPending(false);
    }
  };

  return { getPinned, isPending };
};

export const useGetStarred = () => {
  const [isPending, setIsPending] = useState(false);

  const getStarred = async (params) => {
    setIsPending(true);

    try {
      const res = await axiosInstance.get(`/starred`, {
        params,
      });
      return res?.data;
    } catch (err) {
      return { error: formatError(err) };
    } finally {
      setIsPending(false);
    }
  };

  return { getStarred, isPending };
};

export const useGetFolders = () => {
  const [isPending, setIsPending] = useState(false);

  const getFolders = async (params) => {
    setIsPending(true);

    try {
      const res = await axiosInstance.get(`/folders`, {
        params,
      });
      return res?.data;
    } catch (err) {
      return { error: formatError(err) };
    } finally {
      setIsPending(false);
    }
  };

  return { getFolders, isPending };
};

export const useAddToStarred = () => {
  const [isPending, setIsPending] = useState(false);

  const addToStarred = async (body) => {
    setIsPending(true);

    try {
      const res = await axiosInstance.post(`/star`, body);
      return res?.data;
    } catch (err) {
      return { error: formatError(err) };
    } finally {
      setIsPending(false);
    }
  };

  return { addToStarred, isPending };
};

export const useAddToPinned = () => {
  const [isPending, setIsPending] = useState(false);

  const addToPinned = async (body) => {
    setIsPending(true);

    try {
      const res = await axiosInstance.post(`/pin`, body);
      return res?.data;
    } catch (err) {
      return { error: formatError(err) };
    } finally {
      setIsPending(false);
    }
  };

  return { addToPinned, isPending };
};

export const useRemoveFromStarred = () => {
  const [isPending, setIsPending] = useState(false);

  const removeFromStarred = async (id) => {
    setIsPending(true);

    try {
      const res = await axiosInstance.delete(`/star/${id}`);
      return res?.data;
    } catch (err) {
      return { error: formatError(err) };
    } finally {
      setIsPending(false);
    }
  };

  return { removeFromStarred, isPending };
};

export const useRemoveFromPinned = () => {
  const [isPending, setIsPending] = useState(false);

  const removeFromPinned = async (id) => {
    setIsPending(true);

    try {
      const res = await axiosInstance.delete(`/pin/${id}`);
      return res?.data;
    } catch (err) {
      return { error: formatError(err) };
    } finally {
      setIsPending(false);
    }
  };

  return { removeFromPinned, isPending };
};

export const useGetFolder = () => {
  const [isPending, setIsPending] = useState(false);

  const getFolder = async (id) => {
    setIsPending(true);

    try {
      const res = await axiosInstance.get(`/folder/${id}`);
      return res?.data;
    } catch (err) {
      return { error: formatError(err) };
    } finally {
      setIsPending(false);
    }
  };

  return { getFolder, isPending };
};

export const useCreateFolder = () => {
  const [isPending, setIsPending] = useState(false);

  const createFolder = async (body) => {
    setIsPending(true);

    try {
      const res = await axiosInstance.post(`/folder`, body);
      return res?.data;
    } catch (err) {
      return { error: formatError(err) };
    } finally {
      setIsPending(false);
    }
  };

  return { createFolder, isPending };
};

export const useRenameFolder = () => {
  const [isPending, setIsPending] = useState(false);

  const renameFolder = async (body) => {
    setIsPending(true);

    try {
      const res = await axiosInstance.patch(`/folder/rename`, body);
      return res?.data;
    } catch (err) {
      return { error: formatError(err) };
    } finally {
      setIsPending(false);
    }
  };

  return { renameFolder, isPending };
};

export const useDeleteFolder = () => {
  const [isPending, setIsPending] = useState(false);

  const deleteFolder = async (id) => {
    setIsPending(true);

    try {
      const res = await axiosInstance.delete(`/folder/${id}`);
      return res?.data;
    } catch (err) {
      return { error: formatError(err) };
    } finally {
      setIsPending(false);
    }
  };

  return { deleteFolder, isPending };
};
