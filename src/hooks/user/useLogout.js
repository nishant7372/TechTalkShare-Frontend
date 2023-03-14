import { useState } from "react";
import { useAuthContext } from "./../context/useAuthContext";
import axiosInstance from "../axios/axiosInstance";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const [isPending, setIsPending] = useState(false);

  const logout = async () => {
    setIsPending(true);
    const token = localStorage.getItem("token");

    try {
      //user log out

      const res = await axiosInstance.post(
        "/users/logout",
        {},
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res) {
        return { error: "Unable to Logout" };
      } else {
        localStorage.setItem("token", null); // delete token from localStorage
        dispatch({ type: "LOGOUT" }); //dispatch logout action
        return { ok: "Logout Successful" };
      }
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

  return { logout, isPending };
};
