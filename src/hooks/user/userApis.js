import { useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import {
  setAuthIsReady,
  setServerError,
  setUser,
} from "../../features/authSlice";
import axiosInstance from "../axios/axiosInstance";
import {
  addItemtoLocalStorage,
  removeItemFromLocalStorage,
} from "../utils/globalFunctions";
import { formatError } from "../utils/helperFunctions";
import { setError } from "../../features/alertSlice";

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
      const res = await axiosInstance.post("/users/login", {
        userName,
        password,
        creationTime: new Date().toISOString(),
        osname: `${browser.getOSName()} ${browser.getOSVersion()}`,
        model: browser.getPlatformType(),
        browser: `${browser.getBrowserName()}`,
      });
      const { ok, token, user } = res?.data;
      if (ok) {
        addItemtoLocalStorage({ key: "token", value: token }); // save token in localStorage
        dispatch(setUser(user)); // setting user on login action
        return { ok };
      }
    } catch (err) {
      return { error: formatError(err) };
    } finally {
      setIsPending(false);
    }
  };

  return { login, isPending };
};

export const useSignup = () => {
  const dispatch = useDispatch();
  const [isPending, setIsPending] = useState(false);

  const browser = useMemo(
    () => bowser.getParser(window.navigator.userAgent),
    []
  );

  const signup = async (userName, password, name) => {
    setIsPending(true);

    try {
      //user sign up with name, userName and password
      const res = await axiosInstance.post("/users", {
        name,
        userName,
        password,
        creationTime: new Date().toISOString(),
        osname: `${browser.getOSName()} ${browser.getOSVersion()}`,
        model: browser.getPlatformType(),
        browser: `${browser.getBrowserName()}`,
      });
      const { ok, token, user } = res?.data;
      if (ok) {
        addItemtoLocalStorage({ key: "token", value: token }); // save token in localStorage
        dispatch(setUser(user)); // setting user on login action
        return { ok };
      }
    } catch (err) {
      return { error: formatError(err) };
    } finally {
      setIsPending(false);
    }
  };

  return { signup, isPending };
};

export const useReadProfile = () => {
  const dispatch = useDispatch();
  const [isPending, setIsPending] = useState(false);

  const readProfile = async () => {
    setIsPending(true);
    try {
      const res = await axiosInstance.get("/users/me");
      if (res) {
        dispatch(setAuthIsReady(res?.data)); // dispatch auth_is_ready
        return { ok: res?.data?.ok };
      }
    } catch (error) {
      let err;
      if (error?.response?.status === 401) {
        removeItemFromLocalStorage("token"); //delete token from localStorage when not Authorized
        dispatch(setAuthIsReady(null));
        return dispatch(setError("You have been logged out!"));
      }
      dispatch(setServerError(true));
      return { error: formatError(err) };
    } finally {
      setIsPending(false);
    }
  };
  return { readProfile, isPending };
};

export const useLogout = () => {
  const dispatch = useDispatch();
  const [isPending, setIsPending] = useState(false);

  const logout = async () => {
    setIsPending(true);

    try {
      //user log out
      const res = await axiosInstance.post("/users/logout", {});
      if (res?.data?.ok) {
        removeItemFromLocalStorage("token"); // delete token from localStorage
        dispatch(setUser(null)); //setting user null on logout action
      }
      return res?.data;
    } catch (err) {
      return { error: formatError(err) };
    } finally {
      setIsPending(false);
    }
  };

  return { logout, isPending };
};

export const useLogoutAllOther = () => {
  const [isPending, setIsPending] = useState(false);

  const logoutAllOther = async () => {
    setIsPending(true);

    try {
      //user all other session log out
      const res = await axiosInstance.post("/users/logoutAllOther", {});
      return res?.data;
    } catch (err) {
      return { error: formatError(err) };
    } finally {
      setIsPending(false);
    }
  };
  return { logoutAllOther, isPending };
};

export const useSessionLogout = () => {
  const [isPending, setIsPending] = useState(false);
  const dispatch = useDispatch();

  const sessionLogout = async (id, active) => {
    setIsPending(true);

    try {
      //session logout out by id
      const res = await axiosInstance.post(`/users/logout/${id}`, {});

      if (res?.data?.ok) {
        if (active) {
          removeItemFromLocalStorage("token"); // delete token from localStorage
          dispatch(setUser(null)); // setting user null on logout action
        }
        return res?.data;
      }
    } catch (err) {
      return { error: formatError(err) };
    } finally {
      setIsPending(false);
    }
  };

  return { sessionLogout, isPending };
};

export const useUpdateUser = () => {
  const [isPending, setIsPending] = useState(false);

  const updateUser = async (updates) => {
    setIsPending(true);

    try {
      const res = await axiosInstance.patch("/users/me", updates);
      return res?.data;
    } catch (err) {
      return { error: formatError(err) };
    } finally {
      setIsPending(false);
    }
  };

  return { updateUser, isPending };
};

export const useGetUser = () => {
  const [isPending, setIsPending] = useState(false);

  const getUser = async (userName) => {
    setIsPending(true);

    try {
      const res = await axiosInstance.get(`/user/${userName}`);

      return res?.data;
    } catch (err) {
      return {
        error: { message: formatError(err), status: err.response.status },
      };
    } finally {
      setIsPending(false);
    }
  };

  return { getUser, isPending };
};

export const useGetUsers = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const getUsers = async () => {
    setError(null);
    setIsPending(true);

    try {
      const res = await axiosInstance.get(`/users`);
      return res?.data;
    } catch (err) {
      setError(formatError(err));
    } finally {
      setIsPending(false);
    }
  };

  return { getUsers, error, isPending };
};

export const useDeleteAccount = () => {
  const dispatch = useDispatch();
  const [isPending, setIsPending] = useState(false);

  const deleteAccount = async () => {
    setIsPending(true);

    try {
      const res = await axiosInstance.delete("users/me");

      if (res?.data?.ok) {
        removeItemFromLocalStorage("token"); //delete token from localStorage
        dispatch(setUser(null)); // setting user null on logout
        return res?.data;
      }
    } catch (err) {
      return { error: formatError(err) };
    } finally {
      setIsPending(false);
    }
  };

  return { deleteAccount, isPending };
};
