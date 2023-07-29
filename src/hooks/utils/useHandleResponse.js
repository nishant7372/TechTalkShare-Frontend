import { useDispatch } from "react-redux";
import { setSuccess, setError } from "../../features/alertSlice";

export const useHandleResponse = () => {
  const dispatch = useDispatch();
  const handleResponse = (res) => {
    if (res.ok) {
      dispatch(setSuccess(res.ok));
    } else if (res.error) {
      dispatch(setError(res.error));
    }
  };

  return { handleResponse };
};
