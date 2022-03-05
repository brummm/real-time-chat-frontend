import React from "react";
import { useParams } from "react-router-dom";
import { Chat } from "../components/Chat";
import ChatHeader from "../components/Chat/ChatHeader";
import ErrorPage from "../components/Error/ErrorPage";
import Header from "../components/Header";
import { LoadingPage } from "../components/Loading";
import Page from "../components/Page";
import { Api, useAutoLoadAPI } from "../lib/api";

export const ChatRoute: React.FC = () => {
  const { chatId } = useParams();
  const [loading, data, error] = useAutoLoadAPI(() =>
    Api.get(`/chats/${chatId}`)
  );

  if (loading) return <LoadingPage />;
  if (error)
    return (
      <ErrorPage message="There was an error trying to start the chat. Please, try again." />
    );
  if (!data) return null;

  const { chat } = data;
  const _Header = (
    <Header>
      <ChatHeader users={chat.users} />
    </Header>
  );

  return (
    <Page variation="top" header={_Header}>
      <Chat chat={chat} />
    </Page>
  );
};

export default ChatRoute;
