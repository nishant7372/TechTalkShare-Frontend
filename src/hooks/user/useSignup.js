import { useState, useMemo } from "react";
import { useAuthContext } from "./../useAuthContext";
import axiosInstance from "./../axiosInstance";

const bowser = require("bowser");

export const useSignup = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const browser = useMemo(
    () => bowser.getParser(window.navigator.userAgent),
    []
  );

  const signup = async (userName, password, name) => {
    setError(null);
    setIsPending(true);

    try {
      //user sign up with name, userName and password
      const res = await axiosInstance.post(
        "/users",
        {
          name,
          userName,
          password,
          age: 20,
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
        throw new Error("could not complete signup");
      } else {
        localStorage.setItem("token", res.data.token); // save token in localStorage
      }

      // dispatch login action

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

  return { signup, error, isPending };
};
