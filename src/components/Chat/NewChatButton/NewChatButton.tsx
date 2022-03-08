import { MessageSquareAdd } from "@styled-icons/boxicons-solid";
import React from "react";

import "./NewChatButton.scss";
export const NewChatButton: React.FC<{ href: string }> = ({ href }) => {
  return (
    <a href={href} className="NewChatButton">
      <MessageSquareAdd size={36} />
    </a>
  );
};

export default NewChatButton;
