import { createContext, useReducer } from "react";

export const MessageContext = createContext();

const messageReducer = (state, action) => {
  switch (action.type) {
    case "ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "SUCCESS":
      return {
        ...state,
        success: action.payload,
      };
    case "RESET":
      return {
        error: null,
        success: null,
      };
    default:
      return state;
  }
};

export const MessageContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(messageReducer, {
    error: null,
    success: null,
  });

  return (
    <MessageContext.Provider value={{ ...state, dispatch }}>
      {children}
    </MessageContext.Provider>
  );
};
