import React, { useCallback, useEffect, useRef, useState } from "react";
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

interface ChatProps {
  chat?: ChatModel;
}
export const Chat: React.FC<ChatProps> = ({ chat }) => {
  const [messages, setMessages] = useState(chat?.messages);
  const [users, setUsers] = useState(chat?.users);

  const messagesRef = useRef<HTMLDivElement | null>(null);
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
      scrollMessagesToBottom();
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
      if (chat) {
        chatSocket.sendMessage(message, chat._id);
        scrollMessagesToBottom();
      }
    },
    [chat]
  );

  const updateMessageSize = (size: MessageSize["size"]) => {
    setMessageSizeClassName(size);
  };

  function scrollMessagesToBottom() {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }

  useEffect(() => {
    console.log(chat, messagesRef);
    if (chat && messagesRef) {
      scrollMessagesToBottom();
    }
  }, [chat, messagesRef]);

  return (
    <div className={`Chat ${messageSizeClassName}Message`}>
      <div className="bg"></div>
      {chat && users && (
        <>
          <ChatUsersContext.Provider value={{ users }}>
            <div className="messages" ref={messagesRef}>
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
