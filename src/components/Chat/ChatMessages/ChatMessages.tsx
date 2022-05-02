import React from "react";
import { daysAreEqual } from "../../../lib/date";
import { ChatMessage as ChatMessageModel } from "../../../lib/models/chat-message";
import ChatMessage from "../ChatMessage/ChatMessage";
import "./ChatMessages.scss";
import { ChatMessagesDay } from "./ChatMessagesDay/ChatMessagesDay";

export const ChatMessages: React.FC<{ messages: ChatMessageModel[] }> = ({
  messages,
}) => {
  let previousUser = "";
  let previousDate: Date;

  function isCurrentDayEqualToPrevious(currentDate: Date): boolean {
    if (previousDate === undefined) return false;
    return daysAreEqual(previousDate, currentDate);
  }
  return (
    <div className="ChatMessages">
      {messages.map((message) => {
        const { _id, owner, createdAt } = message;
        let first = false;
        let showDay = false;
        if (previousUser !== owner) {
          first = true;
          previousUser = owner;
        }

        if (createdAt) {
          const date = new Date(createdAt);
          if (!isCurrentDayEqualToPrevious(date)) {
            previousDate = date;
            showDay = true;
          }
        }
        return (
          <React.Fragment key={_id}>
            {showDay && <ChatMessagesDay date={previousDate} />}
            <ChatMessage first={first} message={message} />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ChatMessages;
