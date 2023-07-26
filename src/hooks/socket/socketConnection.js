import { useEffect } from "react";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { setError, setSuccess } from "../../features/alertSlice";
import { setActiveDownloads } from "../../features/downloadSlice";
import { setSocketId } from "../../features/authSlice";

export const useSocketConnection = () => {
  const dispatch = useDispatch();

  const getActivedownloads = (activeDownloads) => {
    dispatch(setActiveDownloads(activeDownloads));
  };

  useEffect(() => {
    const socket = io(process.env.REACT_APP_PROD_SERVER_URL);
    socket.emit("connected", { message: "Connected Successfully" });
    socket.on("socketId", (res) => {
      dispatch(setSocketId(res.socketId));
    });

    socket.emit("downloadStatus", getActivedownloads);

    socket.on("downloadStatus", (res) => {
      if (res.type === "SUCCESS") {
        dispatch(setSuccess(res.status));
      } else if (res.type === "ERROR") {
        dispatch(setError(res.status));
      }
      dispatch(setActiveDownloads(res.activeDownloads));
    });

    return () => {
      socket.disconnect();
    };
  }, []);
};
