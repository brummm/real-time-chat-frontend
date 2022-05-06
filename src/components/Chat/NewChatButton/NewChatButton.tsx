import { MessageSquareAdd } from "@styled-icons/boxicons-solid";
import React, { MouseEventHandler } from "react";

import "./NewChatButton.scss";
export const NewChatButton: React.FC<{
  onClick: MouseEventHandler<HTMLButtonElement>;
}> = ({ onClick }) => {
  return (
    <button onClick={onClick} className="NewChatButton">
      <MessageSquareAdd size={36} />
      <span>Start a chat</span>
    </button>
  );
};

export default NewChatButton;
