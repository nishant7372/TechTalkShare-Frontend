import { useState } from "react";
import axiosInstance from "../axios/axiosInstance";

export const useUploadAvatar = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const uploadAvatar = async (avatarImage) => {
    setError(null);
    setIsPending(true);
    const token = localStorage.getItem("token");

    try {
      const formData = new FormData();
      formData.append("avatar", avatarImage);

      const res = await axiosInstance.post("/users/me/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res) {
        throw new Error("Unable to upload image");
      }
    } catch (error) {
      if (error.response) {
        setError(error?.response?.data?.message || "An error occurred.");
      } else if (error.request) {
        setError("Network error. Please try again later.");
      } else {
        setError("An error occurred. Please try again later.");
      }
    } finally {
      setIsPending(false);
    }
  };

  return { uploadAvatar, error, isPending };
};
