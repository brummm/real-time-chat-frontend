import React, { useCallback, useEffect, useState } from "react";
import { ChatUsersContext } from "../../contexts/ChatUsersContext";
import { Chat as ChatModel } from "../../lib/models/chat";
import { ChatMessage } from "../../lib/models/chat-message";
import { ChatSocket } from "../../lib/sockets/chat";
import "./Chat.scss";
import ChatMessages from "./ChatMessages/ChatMessages";
import SendMessageForm, {
  MessageSize,
} from "./SendMessageForm/SendMessageForm";

let chatSocket: ChatSocket;

interface Props {
  chat: ChatModel;
}
export const Chat: React.FC<Props> = ({ chat }) => {
  const [messages, setMessages] = useState(chat.messages);
  const [users, setUsers] = useState(chat.users);

  const [messageSizeClassName, setMessageSizeClassName] =
    useState<MessageSize["size"]>("normal");

  const onNewMessage = useCallback(
    (message: ChatMessage) => {
      setMessages((oldMessages) => [...oldMessages, message]);
    },
    [setMessages]
  );

  useEffect(() => {
    chatSocket = new ChatSocket();
    chatSocket.join(chat._id);
    chatSocket.onNewMessage = onNewMessage;
    return () => {
      chatSocket.close();
    };
  }, [chatSocket, onNewMessage]);

  const sendMessage = useCallback(
    (message: string) => {
      chatSocket.sendMessage(message, chat._id);
    },
    [chat]
  );

  const updateMessageSize = (size: MessageSize["size"]) => {
    setMessageSizeClassName(size);
  };

  return (
    <div className={`Chat ${messageSizeClassName}Message`}>
      <ChatUsersContext.Provider value={{ users }}>
        <div className="messages">
          {messages && <ChatMessages messages={messages} />}
        </div>
      </ChatUsersContext.Provider>
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
