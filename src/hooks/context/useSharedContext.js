import { useContext } from "react";
import { SharedContext } from "../../context/SharedContext";

export const useSharedContext = () => {
  const context = useContext(SharedContext);

  if (context === undefined) {
    throw new Error(
      "useSharedContext() must be used inside an SharedContextProvider"
    );
  }

  return context;
};
