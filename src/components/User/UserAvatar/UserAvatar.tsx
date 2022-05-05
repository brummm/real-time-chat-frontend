import { User as UserIcon } from "@styled-icons/boxicons-solid";
import React from "react";
import { User } from "../../../lib/models/user";
import multiavatar from "@multiavatar/multiavatar";

interface Props {
  user: User;
}
export const UserAvatar: React.FC<Props> = ({ user }) => {
  const className = "UserAvatar";

  return (
    <>
      {user.multiavatar ? (
        <figure
          className={className}
          dangerouslySetInnerHTML={{ __html: multiavatar(user.multiavatar) }}
        />
      ) : (
        <figure className={className}>
          <UserIcon />
        </figure>
      )}
    </>
  );
};

export default UserAvatar;
