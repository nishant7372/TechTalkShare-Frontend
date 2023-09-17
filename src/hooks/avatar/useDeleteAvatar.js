import { useState } from "react";
import axiosInstance from "../axios/axiosInstance";
import { formatError } from "../utils/helperFunctions";

export const useDeleteAvatar = () => {
  const [isPending, setIsPending] = useState(false);

  const deleteAvatar = async () => {
    setIsPending(true);

    try {
      const res = await axiosInstance.delete("/users/me/avatar");

      return res
        ? { ok: "Avatar Deleted Successfully" }
        : { error: "Unable to Delete Avatar" };
    } catch (err) {
      const error = formatError(err);
      return { error };
    } finally {
      setIsPending(false);
    }
  };

  return { deleteAvatar, isPending };
};
