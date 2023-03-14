import { useContext } from "react";
import { SharingContext } from "../../contexts/SharingContext";

export const useSharingContext = () => {
  const context = useContext(SharingContext);

  if (context === undefined) {
    throw new Error(
      "useSharedContext() must be used inside an SharedContextProvider"
    );
  }

  return context;
};
