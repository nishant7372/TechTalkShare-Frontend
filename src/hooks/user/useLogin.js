import { useState, useMemo } from "react";
import { useAuthContext } from "./../context/useAuthContext";
import axiosInstance from "../axios/axiosInstance";

const bowser = require("bowser");

export const useLogin = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const browser = useMemo(
    () => bowser.getParser(window.navigator.userAgent),
    []
  );

  const login = async (userName, password) => {
    setError(null);
    setIsPending(true);

    try {
      //user log in using userName and password
      const res = await axiosInstance.post(
        "/users/login",
        {
          userName,
          password,
          creationTime: new Date().toISOString(),
          osname: `${browser.getOSName()} ${browser.getOSVersion()}`,
          model: browser.getPlatformType(),
          browser: `${browser.getBrowserName()}`,
        },
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );

      if (!res) {
        throw new Error("could not complete login");
      } else {
        localStorage.setItem("token", res.data.token); // save token in localStorage
      }

      //dispatch login action

      dispatch({ type: "LOGIN", payload: res.data.user });
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

  return { login, error, isPending };
};
