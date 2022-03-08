import React, { useContext, useEffect, useRef } from "react";
import { ChatUsersContext } from "../../../contexts/ChatUsersContext";
import { useUserContext } from "../../../contexts/UserContext";
import { ChatMessage as ChatMessageModel } from "../../../lib/models/chat-message";
import "./ChatMessage.scss";

interface Props {
  message: ChatMessageModel;
  first?: boolean;
}
export const ChatMessage: React.FC<Props> = ({ message, first = false }) => {
  const { user: currentUser } = useUserContext();
  const { users } = useContext(ChatUsersContext);
  const messageRef = useRef<HTMLDivElement>(null);

  const { message: chatMessage, owner } = message;
  const classNames = ["ChatMessage"];
  let userName = "";
  if (first) {
    classNames.push("first");
    const user = users.find((user) => user._id === owner);
    if (user) {
      userName = user.userName;
    }
  }

  if (owner === currentUser?._id) {
    classNames.push("messageIsFromCurrentUser");
  }

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView();
    }
  }, [messageRef]);
  return (
    <div className={classNames.join(" ")} ref={messageRef}>
      {first && userName && <p className="user">@{userName}</p>}
      <p className="message">{chatMessage}</p>
    </div>
  );
};

export default ChatMessage;
