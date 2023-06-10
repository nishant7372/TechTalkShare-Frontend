import { useEffect } from "react";
import { io } from "socket.io-client";
import { useMessageContext } from "../context/useMessageContext";
import { useAuthContext } from "../context/useAuthContext";

export const useSocketConnection = () => {
  const { dispatch: messageDispatch } = useMessageContext();
  const { dispatch } = useAuthContext();

  const getActivedownloads = (activeDownloads) => {
    dispatch({ type: "ACTIVE_DOWNLOADS", payload: activeDownloads });
  };

  useEffect(() => {
    const socket = io(process.env.REACT_APP_PROD_SERVER_URL);
    socket.emit("connected", { message: "Connected Successfully" });
    socket.on("socketId", (res) =>
      dispatch({ type: "SOCKETID", payload: res.socketId })
    );

    socket.emit("downloadStatus", getActivedownloads);

    socket.on("downloadStatus", (res) => {
      messageDispatch({ type: res.type, payload: res.status });
      dispatch({ type: "ACTIVE_DOWNLOADS", payload: res.activeDownloads });
    });

    return () => {
      socket.disconnect();
    };
  }, []);
};
