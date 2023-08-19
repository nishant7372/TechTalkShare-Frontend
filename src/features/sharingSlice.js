import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  articles: null,
  articleCount: 0,
  filters: {
    currPageNo: 0,
    sortBy: "createdAt:desc",
    limit: 10,
    searchText: "",
    tag: null,
  },
};

const sharingSlice = createSlice({
  name: "sharing",
  initialState,
  reducers: {
    setArticles: (state, action) => {
      state.articles = action.payload;
    },
    setArticleCount: (state, action) => {
      state.articleCount = action.payload;
    },
    // setCurrPageNo: (state, action) => {
    //   state.filters.currPageNo = action.payload;
    // },
    // setSortBy: (state, action) => {
    //   state.filters.sortBy = action.payload;
    //   state.filters.currPageNo = 0;
    // },
    // setSearchText: (state, action) => {
    //   state.filters.searchText = action.payload;
    //   state.filters.currPageNo = 0;
    // },
    // setTag: (state, action) => {
    //   state.filters.tag = action.payload;
    //   state.filters.currPageNo = 0;
    // },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
});

export const {
  setArticles,
  setArticleCount,
  // setCurrPageNo,
  // setSortBy,
  // setSearchText,
  // setTag,
  setFilters,
} = sharingSlice.actions;

export default sharingSlice.reducer;
