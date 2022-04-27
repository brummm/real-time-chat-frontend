import { io, Socket } from "socket.io-client";
import { ChatMessage } from "../models/chat-message";
export class ChatSocket {
  private socket: Socket;
  onNewMessage: (message: ChatMessage) => void = () => {};

  constructor() {
    this.socket = io(`${process.env.REACT_APP_API_URL}/chat`, {
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
