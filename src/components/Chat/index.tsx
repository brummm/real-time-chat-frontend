import React, { useCallback, useEffect, useState } from "react";
import { Chat as ChatModel } from "../../lib/models/chat";
import ErrorPage from "../Error/ErrorPage";
import "./Chat.scss";
import SendMessageForm, { MessageSize } from "./SendMessageForm";
import { ChatSocket } from "../../lib/sockets/chat";

interface Props {
  chat: ChatModel;
}
export const Chat: React.FC<Props> = ({ chat }) => {
  const [messageSizeClassName, setMessageSizeClassName] =
    useState<MessageSize["size"]>("normal");

  const sendMessage = useCallback(
    (message: string) => {
      console.log(message);

      ChatSocket.sendMessage(message, chat._id);
    },
    [chat]
  );

  useEffect(() => {
    ChatSocket.connect();
    return () => {
      ChatSocket.close();
    };
  }, [ChatSocket]);

  const updateMessageSize = (size: MessageSize["size"]) => {
    setMessageSizeClassName(size);
  };

  return (
    <div className={`Chat ${messageSizeClassName}Message`}>
      <div className="messages"></div>
      <section className="sendMessage">
        <SendMessageForm
          updateMessageSize={updateMessageSize}
          sendMessage={sendMessage}
        />
      </section>
    </div>
  );
};

export default Chat;
