import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Chat } from "../../components/Chat/Chat";
import { Chat as ChatModel } from "../../lib/models/chat";
import ChatHeader from "../../components/Chat/ChatHeader/ChatHeader";
import ChatList from "../../components/Chat/ChatList/ChatList";
import Header from "../../components/Header/Header";
import { Page } from "../../components/Page/Page";
import axios from "../../lib/axios";
import "./ChatListAndChat.scss";
import AuthGuard from "../../components/Guards/AuthGuard";
import { useRef } from "react";
import { NoChat } from "../../components/Chat/NoChat/NoChat";

export default function ChatsRoute() {
  const { chatId } = useParams();

  // TODO: handle error
  const {
    data: chat,
    isLoading,
    isError,
    error,
  } = useQuery<ChatModel, AxiosError>(
    ["CHAT", chatId],
    async () => {
      const { data } = await axios.get(`/chats/${chatId}`);
      return data.chat;
    },
    { enabled: chatId !== undefined }
  );

  const _Header = (
    <Header>
      <ChatHeader chat={chat} />
    </Header>
  );

  return (
    <AuthGuard signInPath="/sign-in">
      <Page variation="top" header={chat && _Header}>
        <div className={`ChatListAndChat ${!chat ? "noChat" : ""}`}>
          <div className="chatList">
            <ChatList />
          </div>
          <div className="chat">
            {!chat && (
              <NoChat
                isLoading={isLoading}
                isError={isError}
                error={error?.response?.data.error || error?.message}
              />
            )}
            {chat && <Chat chat={chat} />}
          </div>
        </div>
      </Page>
    </AuthGuard>
  );
}
