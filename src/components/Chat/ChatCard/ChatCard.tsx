import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { Chat } from "../../../lib/models/chat";
import UserAvatar from "../../User/UserAvatar/UserAvatar";
import "./ChatCard.scss";

const MESSAGE_THRESHOLD = 70;

export const ChatCard: React.FC<{ chat: Chat; filter?: string }> = ({
  chat,
  filter,
}) => {
  const { user } = useAuth();
  let message = "";

  if (chat.messages.length) {
    message = chat.messages.slice(-1)[0].message;
    if (filter) {
      const filteredMessage = chat.messages.find((message) =>
        message.message.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
      );
      console.log(filteredMessage);

      if (filteredMessage) message = filteredMessage.message;
    }

    if (message.length > MESSAGE_THRESHOLD) {
      message = message.substring(0, MESSAGE_THRESHOLD);
      const lastSpaceIndex = message.lastIndexOf(" ");
      message = message.substring(0, lastSpaceIndex) + "...";
    }
    if (filter) {
      message = highlightFilter(message);
    }
  }

  function highlightFilter(message: string): string {
    return message.replace(
      new RegExp("(^|\\s)(" + filter + ")(\\s|$)", "ig"),
      "$1<strong>$2</strong>$3"
    );
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
            <span
              className="lastMessage"
              dangerouslySetInnerHTML={{ __html: message }}
            />
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
