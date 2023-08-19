import { useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import axiosInstance from "../axios/axiosInstance";
import { setUser } from "../../features/authSlice";
import { addItemtoLocalStorage } from "../utils/gobalFunctions";

const bowser = require("bowser");

export const useLogin = () => {
  const dispatch = useDispatch();
  const [isPending, setIsPending] = useState(false);

  const browser = useMemo(
    () => bowser.getParser(window.navigator.userAgent),
    []
  );

  const login = async (userName, password) => {
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
        return { error: "Unable to LogIn" };
      } else {
        addItemtoLocalStorage({ key: "token", value: res?.data?.token }); // save token in localStorage
        dispatch(setUser(res?.data?.user)); // setting user on login action
        return { ok: "Login Successful" };
      }
    } catch (err) {
      let error = "";
      if (err?.response) {
        error = err?.response?.data?.message || "An error occurred.";
      } else if (err?.request) {
        error = "Network error. Please try again later.";
      } else {
        error = "An error occurred. Please try again later.";
      }
      return { error };
    } finally {
      setIsPending(false);
    }
  };

  return { login, isPending };
};
