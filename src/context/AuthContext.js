import { createContext, useEffect, useReducer } from "react";
import axiosInstance from "../hooks/axiosInstance";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload, serverError: false };
    case "LOGOUT":
      return { ...state, user: null, serverError: false };
    case "AUTH_IS_READY":
      return {
        ...state,
        user: action.payload,
        authIsReady: true,
        serverError: false,
      };
    case "SERVER_ERROR":
      return { ...state, serverError: true, user: null, authIsReady: false };
    case "CURRENT_SESSION":
      return { ...state, currentSessionID: action.payload, serverError: false };
    default:
      return state;
  }
};

// only on refresh
const readProfile = async (token, dispatch) => {
  try {
    const res = await axiosInstance.get("/users/me", {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    });

    // dispatch auth_is_ready
    dispatch({ type: "AUTH_IS_READY", payload: res.data });
  } catch (err) {
    // when unauthorize delete token from localstorage
    if (err?.response?.status === 401) {
      localStorage.setItem("token", null); //delete token from localStorage
      alert("You have been logged out!");
      dispatch({ type: "AUTH_IS_READY", payload: null });
    } else {
      dispatch({ type: "SERVER_ERROR" });
    }
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
    currentSessionID: null,
  });

  useEffect(() => {
    // reading Profile only when token is not null
    if (localStorage.getItem("token") !== "null")
      readProfile(localStorage.getItem("token"), dispatch);
    else dispatch({ type: "AUTH_IS_READY", payload: null }); // on each refresh dispatch auth_is_ready
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
