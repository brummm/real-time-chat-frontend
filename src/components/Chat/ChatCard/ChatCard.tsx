import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { Chat } from "../../../lib/models/chat";
import { ChatMessage } from "../../../lib/models/chat-message";
import UserAvatar from "../../User/UserAvatar/UserAvatar";
import "./ChatCard.scss";

const MESSAGE_THRESHOLD = 70;

export const ChatCard: React.FC<{ chat: Chat; filter?: string }> = ({
  chat,
  filter,
}) => {
  const { user } = useAuth();
  let lastMessage: ChatMessage | null = null;
  let messageText = "";

  if (chat.messages.length) {
    lastMessage = getLastMessageFromChat(chat);
    messageText = lastMessage.message;
    if (filter) {
      const filteredMessage = chat.messages.find((message) =>
        message.message.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
      );

      if (filteredMessage) {
        lastMessage = filteredMessage;
        messageText = filteredMessage.message;
      }
    }

    if (messageText.length > MESSAGE_THRESHOLD) {
      messageText = messageText.substring(0, MESSAGE_THRESHOLD);
      const lastSpaceIndex = messageText.lastIndexOf(" ");
      messageText = messageText.substring(0, lastSpaceIndex) + "...";
    }
    if (filter) {
      messageText = highlightFilter(messageText);
    }
  }

  function highlightFilter(message: string): string {
    return message.replace(
      new RegExp("(^|\\s)(" + filter + ")(\\s|$)", "ig"),
      "$1<strong>$2</strong>$3"
    );
  }

  const otherUsers = chat.users.filter(
    (userInChat) => userInChat._id !== user?._id
  );

  return (
    <div className="ChatCard">
      <Link to={`/chats/${chat._id}`}>
        <UserAvatar user={otherUsers[0]} />
        <p className="data">
          {otherUsers.map((user, index) => (
            <span key={index} className="name">
              @{user.userName}
            </span>
          ))}
          {messageText.length !== 0 && (
            <span className="lastMessage">
              {lastMessage?.owner === user?._id && (
                <span className="you">You: </span>
              )}
              <span dangerouslySetInnerHTML={{ __html: messageText }}></span>
            </span>
          )}
          {messageText.length === 0 && (
            <span className="lastMessage noMessage">Still no messages</span>
          )}
        </p>
      </Link>
    </div>
  );
};

function getLastMessageFromChat(chat: Chat): ChatMessage {
  return chat.messages.slice(-1)[0];
}

export default ChatCard;
