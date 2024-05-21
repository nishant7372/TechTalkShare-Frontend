import { useState } from "react";
import axiosInstance from "../axios/axiosInstance";
import { formatError } from "../utils/helperFunctions";

export const useGetMessages = () => {
  const [isPending, setIsPending] = useState(false);

  const getMessages = async (userName) => {
    setIsPending(true);

    try {
      const res = await axiosInstance.get(`/messages/${userName}`);
      return res?.data;
    } catch (err) {
      return {
        error: { message: formatError(err), status: err.response.status },
      };
    } finally {
      setIsPending(false);
    }
  };

  return { getMessages, isPending };
};
