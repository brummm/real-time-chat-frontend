import React from "react";
import Chat from "../Chat";
import { Chat as ChatModel } from "../../../lib/models/chat";
import ChatList from "../ChatList/ChatList";
import "./ChatListAndChat.scss";

interface Props {
  chat: ChatModel;
}
export const ChatListAndChat: React.FC<Props> = ({ chat }) => {
  return (
    <div className="ChatListAndChat">
      <div className="chatList">
        <ChatList />
      </div>
      <div className="chat">
        <Chat chat={chat} />
      </div>
    </div>
  );
};

export default ChatListAndChat;
