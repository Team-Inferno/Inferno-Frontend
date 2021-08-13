import { createContext } from "react";
import Peer from "peerjs";

export const peer = new Peer();
export const PeerContext = createContext();
