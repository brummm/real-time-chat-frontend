import { io, Socket } from "socket.io-client";
import constants from "../../lib/constants";
import { ChatMessage } from "../models/chat-message";
const { API_URL } = constants;

export class ChatSocket {
  private socket: Socket;
  onNewMessage: (message: ChatMessage) => void = () => {};

  constructor() {
    this.socket = io(`${API_URL}/chat`, {
      withCredentials: true,
      secure: true,
    });

    this.socket.on("newMessage", (message) => {
      console.log("newMessage", message);
      this.onNewMessage(message);
    });
  }

  getSocket() {
    return this.socket;
  }

  close() {
    this.socket.close();
  }

  sendMessage(message: string, chatId: string): void {
    this.socket.emit("sendMessage", message, chatId);
  }

  join(chatId: string): void {
    this.socket.emit("joinChat", chatId);
  }
}
