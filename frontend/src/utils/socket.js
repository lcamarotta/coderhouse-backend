import io from "socket.io-client";
import { backendURL } from "./config";

const connectionOptions = {
  forceNew: true,
  reconnectionAttempts: "Infinity",
  timeout: 10000,
  transports: ["websocket"],
};

let socket = io.connect(backendURL, connectionOptions);

export default socket;