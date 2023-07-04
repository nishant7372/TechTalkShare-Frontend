import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  articles: null,
  articleCount: 0,
  currPageNo: 0,
  activeFilter: "Newest to Oldest",
};

const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    setArticles: (state, action) => {
      state.articles = action.payload;
    },
    setArticleCount: (state, action) => {
      state.articleCount = action.payload;
    },
    setCurrPageNo: (state, action) => {
      state.currPageNo = action.payload;
    },
    setActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
  },
});

export const { setArticles, setArticleCount, setCurrPageNo, setActiveFilter } =
  articleSlice.actions;

export default articleSlice.reducer;