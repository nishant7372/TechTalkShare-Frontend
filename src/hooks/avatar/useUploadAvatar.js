import { useState } from "react";
import axiosInstance from "../axios/axiosInstance";
import { getItemFromLocalStorage } from "../utils/gobalFunctions";

export const useUploadAvatar = () => {
  const [isPending, setIsPending] = useState(false);

  const uploadAvatar = async (avatarImage) => {
    setIsPending(true);
    const token = getItemFromLocalStorage("token");

    try {
      const formData = new FormData();
      formData.append("avatar", avatarImage);

      const res = await axiosInstance.post("/users/me/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      return res
        ? { ok: "Avatar Uploaded Successfully" }
        : { error: "Unable to Upload Avatar" };
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

  return { uploadAvatar, isPending };
};
