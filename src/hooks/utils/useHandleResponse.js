import { useDispatch } from "react-redux";
import { setSuccess, setError } from "../../features/alertSlice";

export const useHandleResponse = () => {
  const dispatch = useDispatch();
  const handleResponse = (res) => {
    if (res?.ok) {
      dispatch(setSuccess(res?.ok));
    } else if (res?.error) {
      dispatch(setError(parseError(res?.error)));
    }
  };

  const parseError = (error) => {
    if (error.includes("Unable to login")) {
      return "Incorrect Username or Password!";
    } else if (error.includes("duplicate key error")) {
      return "Username already taken!";
    } else {
      return error;
    }
  };

  return { handleResponse };
};
