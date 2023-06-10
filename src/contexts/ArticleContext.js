import { createContext, useReducer } from "react";
import { useSocketConnection } from "../hooks/socket/socketConnection";

export const ArticleContext = createContext();

const articleReducer = (state, action) => {
  switch (action.type) {
    case "ARTICLES":
      return {
        ...state,
        articles: action.payload.articles,
        articleCount: action.payload.articleCount,
      };
    case "PAGE_CHANGED":
      return {
        ...state,
        currPageNo: action.payload,
      };
    case "FILTER":
      return {
        ...state,
        activeFilter: action.payload,
      };
    default:
      return state;
  }
};

export const ArticleContextProvider = ({ children }) => {
  useSocketConnection();
  const [state, dispatch] = useReducer(articleReducer, {
    articles: null,
    articleCount: 0,
    currPageNo: 0,
    activeFilter: "Newest to Oldest",
  });

  return (
    <ArticleContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ArticleContext.Provider>
  );
};
