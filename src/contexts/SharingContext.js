import { createContext, useReducer } from "react";

export const SharingContext = createContext();

const sharingReducer = (state, action) => {
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

export const SharingContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(sharingReducer, {
    articles: null,
    articleCount: 0,
    currPageNo: 0,
    activeFilter: "Recently Shared",
  });

  return (
    <SharingContext.Provider value={{ ...state, dispatch }}>
      {children}
    </SharingContext.Provider>
  );
};
