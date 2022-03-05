
import React from "react";
import { User } from "../../../lib/models/user";
import UserAvatar from "../UserAvatar";
import "./UserCard.scss";

interface Props {
  user: User;
}
export const UserCard: React.FC<Props> = ({ user }) => {
  const { firstName, lastName, userName } = user;
  return (
    <div className="UserCard">
      <UserAvatar user={user} />
      <div className="data">
        <p>@{userName}</p>
        <h1>{`${firstName} ${lastName}`}</h1>
      </div>
    </div>
  );
};

export default UserCard;
