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
  chat?: ChatModel;
  loading?: boolean;
  error?: string;
}
export const Chat: React.FC<Props> = ({ chat }) => {
  const [messages, setMessages] = useState(chat?.messages);
  const [users, setUsers] = useState(chat?.users);
  useEffect(() => {
    if (chat) {
      setMessages(chat.messages);
      setUsers(chat.users);
    }
  }, [chat]);

  const [messageSizeClassName, setMessageSizeClassName] =
    useState<MessageSize["size"]>("normal");

  const onNewMessage = useCallback(
    (message: ChatMessage) => {
      setMessages((oldMessages) => {
        if (oldMessages === undefined) return [message];
        return [...oldMessages, message];
      });
    },
    [setMessages]
  );

  useEffect(() => {
    if (chat) {
      chatSocket = new ChatSocket();
      chatSocket.join(chat._id);
      chatSocket.onNewMessage = onNewMessage;
      return () => {
        chatSocket.close();
      };
    }
  }, [chat, onNewMessage]);

  const sendMessage = useCallback(
    (message: string) => {
      if (chat) chatSocket.sendMessage(message, chat._id);
    },
    [chat]
  );

  const updateMessageSize = (size: MessageSize["size"]) => {
    setMessageSizeClassName(size);
  };

  return (
    <div className={`Chat ${messageSizeClassName}Message`}>
      {chat && users && (
        <>
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
        </>
      )}
    </div>
  );
};

export default Chat;
