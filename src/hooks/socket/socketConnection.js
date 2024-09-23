import { useEffect } from "react";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { setSocketId } from "../../features/authSlice";
import apiConstants from "../../constants/apiConstants";

export const useSocketConnection = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io(apiConstants.BASE_URL);
    socket.emit("connected", { message: "Connected Successfully" });
    socket.on("socketId", (res) => {
      dispatch(setSocketId(res.socketId));
    });

    return () => {
      socket.disconnect();
    };
  }, []);
};
