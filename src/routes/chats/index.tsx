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
          <ChatList />
          <Chat chat={chat} loading={isLoading} />
        </div>
      </Page>
    </AuthGuard>
  );
}
