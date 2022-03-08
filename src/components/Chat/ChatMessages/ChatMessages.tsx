import React from "react";
import { ChatMessage as ChatMessageModel } from "../../../lib/models/chat-message";
import ChatMessage from "../ChatMessage/ChatMessage";
import "./ChatMessages.scss";

export const ChatMessages: React.FC<{ messages: ChatMessageModel[] }> = ({
  messages,
}) => {
  let previousUser = "";
  return (
    <div className="ChatMessages">
      {messages.map((message) => {
        const { _id, owner } = message;
        let first = false;
        if (previousUser !== owner) {
          first = true;
          previousUser = owner;
        }
        return <ChatMessage key={_id} first={first} message={message} />;
      })}
    </div>
  );
};

export default ChatMessages;
