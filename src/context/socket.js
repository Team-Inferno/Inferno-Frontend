import {createContext} from "react";
import io from "socket.io-client";

export const socket = io.connect(`http://localhost:9090`);
export const SocketContext = createContext();
