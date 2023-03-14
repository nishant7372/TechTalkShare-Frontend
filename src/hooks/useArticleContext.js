import { useContext } from "react";
import { ArticleContext } from "../context/ArticleContext";

export const useArticleContext = () => {
  const context = useContext(ArticleContext);

  if (context === undefined) {
    throw new Error(
      "useArticleContext() must be used inside an ArticleContextProvider"
    );
  }

  return context;
};
