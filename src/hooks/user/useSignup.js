import { useState, useMemo } from "react";
import { useAuthContext } from "./../context/useAuthContext";
import axiosInstance from "../axios/axiosInstance";

const bowser = require("bowser");

export const useSignup = () => {
  const { dispatch } = useAuthContext();
  const [isPending, setIsPending] = useState(false);

  const browser = useMemo(
    () => bowser.getParser(window.navigator.userAgent),
    []
  );

  const signup = async (userName, password, name) => {
    setIsPending(true);

    try {
      //user sign up with name, userName and password
      const res = await axiosInstance.post(
        "/users",
        {
          name,
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
        return { error: "Unable to Signup" };
      } else {
        localStorage.setItem("token", res.data.token); // save token in localStorage
        dispatch({ type: "LOGIN", payload: res.data.user }); // dispatch login action

        return { ok: "Account Created Successfully" };
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

  return { signup, isPending };
};
