import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { Chat } from "../../../lib/models/chat";
import UserAvatar from "../../User/UserAvatar/UserAvatar";
import "./ChatCard.scss";

const MESSAGE_THRESHOLD = 70;

export const ChatCard: React.FC<{ chat: Chat }> = ({ chat }) => {
  const { user } = useAuth();
  let message = "";
  if (chat.messages.length) {
    message = chat.messages.slice(-1)[0].message;
    if (message.length > MESSAGE_THRESHOLD) {
      message = message.substring(0, MESSAGE_THRESHOLD);
      const lastSpaceIndex = message.lastIndexOf(" ");
      message = message.substring(0, lastSpaceIndex) + "...";
    }
  }

  return (
    <div className="ChatCard">
      <Link to={`/chats/${chat._id}`}>
        <UserAvatar user={chat.users[0]} />
        <p className="data">
          {chat.users
            .filter((userInChat) => userInChat._id !== user?._id)
            .map((user, index) => (
              <span key={index} className="name">
                @{user.userName}
              </span>
            ))}
          {message.length !== 0 && (
            <span className="lastMessage">{message}</span>
          )}
          {message.length === 0 && (
            <span className="lastMessage noMessage">Still no messages</span>
          )}
        </p>
      </Link>
    </div>
  );
};

export default ChatCard;
