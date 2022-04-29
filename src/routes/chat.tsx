import React from "react";
import { useParams } from "react-router-dom";
import ChatHeader from "../components/Chat/ChatHeader/ChatHeader";
import ChatListAndChat from "../components/Chat/ChatListAndChat/ChatListAndChat";
import ErrorPage from "../components/Error/ErrorPage/ErrorPage";
import Header from "../components/Header/Header";
import { LoadingPage } from "../components/Loading/Loading";
import Page from "../components/Page/Page";
import { useAutoLoadAPI } from "../lib/api";
import axios from "../lib/axios";

export const ChatRoute: React.FC = () => {
  const { chatId } = useParams();
  const { loading, data, error } = useAutoLoadAPI(() =>
    axios.get(`/chats/${chatId}`)
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
      <ChatListAndChat chat={chat} />
    </Page>
  );
};

export default ChatRoute;
