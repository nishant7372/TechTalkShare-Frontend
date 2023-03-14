import { useContext } from "react";
import { MessageContext } from "../contexts/MessageContext";

export const useMessageContext = () => {
  const context = useContext(MessageContext);

  if (context === undefined) {
    throw new Error(
      "useMessageContext() must be used inside an MessageContextProvider"
    );
  }

  return context;
};
