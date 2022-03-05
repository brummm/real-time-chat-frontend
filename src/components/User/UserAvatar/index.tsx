import { User as UserIcon } from "@styled-icons/boxicons-solid";
import React from "react";
import { User } from "../../../lib/models/user";
import './UserAvatar.scss';

interface Props {
  user: User;
}
export const UserAvatar: React.FC<Props> = ({ user }) => {

  // TODO: implement avatar into backend to change it here

  return (
    <figure className="UserAvatar">
      <UserIcon />
    </figure>
  );
};

export default UserAvatar;
