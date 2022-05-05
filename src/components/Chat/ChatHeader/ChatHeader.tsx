import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { Chat } from "../../../lib/models/chat";
import { User } from "../../../lib/models/user";
import variables from "../../../styles/variables.scss";
import UserAvatar from "../../User/UserAvatar/UserAvatar";
import "./ChatHeader.scss";

export const ChatHeader: React.FC<{ chat?: Chat }> = ({ chat }) => {
  const { user: currentUser } = useAuth();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    if (chat) {
      const usersExceptCurrent = chat.users.filter(
        (_user) => _user._id !== currentUser?._id
      );
      setUser(usersExceptCurrent[0]);
    } else {
      setUser(undefined);
    }
  }, [chat, currentUser?._id]);
  // const usersExceptCurrent = users.filter((_user) => _user._id !== user?._id);
  // TODO: format for multiple users
  // const { userName } = usersExceptCurrent[0];

  return (
    <div className="ChatHeader">
      <Link to="/chats" className="back">
        <svg
          width="16"
          height="26"
          viewBox="0 0 16 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="16" height="26" />
          <path
            d="M12.8229 0L0 13L12.8229 26L16 22.779L6.35416 13L16 3.22096L12.8229 0Z"
            fill={variables.pallete4}
          />
        </svg>
      </Link>
      {user && (
        <>
          <UserAvatar user={user!} />
          <h1>@{user?.userName}</h1>
        </>
      )}
    </div>
  );
};

export default ChatHeader;
