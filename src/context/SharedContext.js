import { createContext, useReducer } from "react";

export const SharedContext = createContext();

export const sharedReducer = (state, action) => {
  switch (action.type) {
    case "SHARED_ARTICLES":
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

export const SharedContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(sharedReducer, {
    articles: null,
    articleCount: 0,
    currPageNo: 0,
    activeFilter: "Recently Shared",
  });

  return (
    <SharedContext.Provider value={{ ...state, dispatch }}>
      {children}
    </SharedContext.Provider>
  );
};
