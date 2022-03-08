import React from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../../../contexts/UserContext";
import { User } from "../../../lib/models/user";
import UserAvatar from "../../User/UserAvatar/UserAvatar";
import "./ChatHeader.scss";

interface Props {
  users: User[];
}
export const ChatHeader: React.FC<Props> = ({ users }) => {
  const { user } = useUserContext();
  const usersExceptCurrent = users.filter((_user) => _user._id !== user?._id);
  // TODO: format for multiple users
  const { userName } = usersExceptCurrent[0];

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
            fill="#F7F7F2"
          />
        </svg>
      </Link>
      <UserAvatar user={users[0]} />
      <h1>@{userName}</h1>
    </div>
  );
};

export default ChatHeader;
