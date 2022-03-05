import { io, Socket } from "socket.io-client";
import constants from "../../lib/constants";
const { API_URL } = constants;

let socket: Socket | undefined;

export const ChatSocket = {
  connect() {
    socket = io(`${API_URL}/chat`, {
      withCredentials: true,
      secure: true,
    });
  },
  getSocket() {
    if (socket === undefined) {
      this.connect();
    }
    return socket;
  },
  close() {
    if (socket !== undefined) {
      socket.close();
      socket = undefined;
    }
  },
  sendMessage(message: string, chatId: string): void {
    socket?.emit("sendMessage", message, chatId);
  },
};
