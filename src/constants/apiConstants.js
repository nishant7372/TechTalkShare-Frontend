const apiConstants = {
  BASE_URL:
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_DEV_SERVER_URL
      : process.env.REACT_APP_PROD_SERVER_URL,
};

export default apiConstants;
