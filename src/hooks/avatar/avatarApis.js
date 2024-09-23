import { useState } from "react";
import axiosInstance from "../axios/axiosInstance";
import { formatError } from "../utils/helperFunctions";

export const useDeleteAvatar = () => {
  const [isPending, setIsPending] = useState(false);

  const deleteAvatar = async () => {
    setIsPending(true);

    try {
      const res = await axiosInstance.delete("/users/me/avatar");
      return res?.data;
    } catch (err) {
      return { error: formatError(err) };
    } finally {
      setIsPending(false);
    }
  };

  return { deleteAvatar, isPending };
};

export const useGetAvatar = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const getAvatar = async (id) => {
    setError(null);
    setIsPending(true);

    try {
      const res = await axiosInstance.get(`/users/${id}/avatar`);
      return res?.data;
    } catch (err) {
      setError(formatError(err));
    } finally {
      setIsPending(false);
    }
  };

  return { getAvatar, error, isPending };
};

export const useUploadAvatar = () => {
  const [isPending, setIsPending] = useState(false);

  const uploadAvatar = async (avatarImage) => {
    setIsPending(true);

    try {
      const formData = new FormData();
      formData.append("avatar", avatarImage);

      const res = await axiosInstance.post("/users/me/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res?.data;
    } catch (err) {
      return { error: formatError(err) };
    } finally {
      setIsPending(false);
    }
  };

  return { uploadAvatar, isPending };
};
