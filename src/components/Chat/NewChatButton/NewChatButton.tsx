import { MessageSquareAdd } from "@styled-icons/boxicons-solid";
import React, { MouseEventHandler } from "react";

import "./NewChatButton.scss";
export const NewChatButton: React.FC<{
  onClick: MouseEventHandler<HTMLButtonElement>;
}> = ({ onClick }) => {
  return (
    <button onClick={onClick} className="NewChatButton">
      <MessageSquareAdd size={36} />
    </button>
  );
};

export default NewChatButton;
