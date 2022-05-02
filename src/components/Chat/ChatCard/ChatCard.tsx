import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { Chat } from "../../../lib/models/chat";
import UserAvatar from "../../User/UserAvatar/UserAvatar";
import "./ChatCard.scss";

export const ChatCard: React.FC<{ chat: Chat }> = ({ chat }) => {
  const { user } = useAuth();
  let message = "";
  if (chat.messages.length) {
    message = chat.messages[chat.messages.length - 1].message;
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
          {message && <span className="lastMessage">{message}</span>}
        </p>
      </Link>
    </div>
  );
};

export default ChatCard;
