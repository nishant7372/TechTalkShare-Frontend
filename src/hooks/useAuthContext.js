import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error(
      "useAuthContext() must be used inside an AuthContextProvider"
    );
  }

  return context;
};
