import { ChatMessage } from "./chat-message";
import { User } from "./user";

export interface Chat {
  _id: string;
  users: User[];
  messages: ChatMessage[];
}
