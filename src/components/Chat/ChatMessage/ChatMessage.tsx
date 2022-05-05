import React, { useContext, useRef } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { ChatUsersContext } from "../../../contexts/ChatUsersContext";
import { ChatMessage as ChatMessageModel } from "../../../lib/models/chat-message";
import "./ChatMessage.scss";

interface Props {
  message: ChatMessageModel;
  first?: boolean;
}
export const ChatMessage: React.FC<Props> = ({ message, first = false }) => {
  const { user: currentUser } = useAuth();
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

  const date = new Date(message.createdAt!);

  const hour = Intl.DateTimeFormat("en-US", { timeStyle: "short" }).format(
    date
  );

  return (
    <div className={classNames.join(" ")} ref={messageRef}>
      <div className="userNameAndHour">
        {first && userName && <p className="user">@{userName}</p>}
        <p className="hours">{hour}</p>
      </div>
      <p
        className="message"
        dangerouslySetInnerHTML={{ __html: chatMessage.replace("\n", "<br>") }}
      />
    </div>
  );
};

export default ChatMessage;
