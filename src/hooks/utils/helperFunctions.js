export const formatError = (err) => {
  let error = "";
  if (err?.response) {
    error = err?.response?.data?.message || "An error occurred.";
  } else if (err?.request) {
    error = "Network error. Please try again later.";
  } else {
    error = "An error occurred. Please try again later.";
  }
  return error;
};
