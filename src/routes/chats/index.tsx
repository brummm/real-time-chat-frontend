import { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { Chat } from "../../components/Chat/Chat";
import ChatHeader from "../../components/Chat/ChatHeader/ChatHeader";
import ChatList from "../../components/Chat/ChatList/ChatList";
import {
  CreateChatPageOverlay,
  NEW_CHAT_ANCHOR,
} from "../../components/Chat/CreateChatPageOverlay/CreateChatPageOverlay";
import NewChatButton from "../../components/Chat/NewChatButton/NewChatButton";
import { NoChat } from "../../components/Chat/NoChat";
import ErrorMessage from "../../components/Error/ErrorMessage/ErrorMessage";
import { ButtonAnchor } from "../../components/Form/Button/Button";
import AuthGuard from "../../components/Guards/AuthGuard";
import Header from "../../components/Header/Header";
import { LoadingCentered } from "../../components/Loading/Loading";
import NoData from "../../components/NoData/NoData";
import { Page } from "../../components/Page/Page";
import axios from "../../lib/axios";
import { Chat as ChatModel } from "../../lib/models/chat";
import "./ChatListAndChat.scss";

const REFECTH_INTERVAL = 5000;

export default function ChatsRoute() {
  const { chatId } = useParams();
  const navigate = useNavigate();

  const [isCreatingChat, setIsCreatingChat] = useState(false);

  const {
    data: chats,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<ChatModel[], AxiosError>("CHATS", async () => {
    const { data } = await axios.get("/chats");
    return data.chats;
  });

  // In a real world application, it would only bring the last updates to the chats instead of bringing everything again
  useEffect(() => {
    const interval = setInterval(async () => {
      await refetch();
    }, REFECTH_INTERVAL);
    return () => clearInterval(interval);
  }, [refetch]);

  const onCreateChat = useCallback(
    async (chat: ChatModel) => {
      setIsCreatingChat(false);
      refetch();
      navigate(`/chats/${chat._id}`);
    },
    [navigate, refetch]
  );

  const {
    data: chat,
    isLoading: isLoadingChat,
    isError: isErrorChat,
    error: errorChat,
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

  function goToChatCreation(): void {
    setIsCreatingChat(true);
  }

  return (
    <AuthGuard signInPath="/sign-in">
      <Page variation="top" header={chat && _Header}>
        {chats && chats.length === 0 && (
          <NoData>
            <p>You still have no chats.</p>
            <ButtonAnchor onClick={goToChatCreation}>Start One</ButtonAnchor>
          </NoData>
        )}
        {chats && chats.length > 0 && (
          <div className={`ChatListAndChat ${!chat ? "noChat" : ""}`}>
            <div className="chatList">
              {isLoading && <LoadingCentered size="small" />}
              {isError && error && <ErrorMessage message={error.message} />}
              {chats && <ChatList chats={chats} />}
              <div className="newChatButton">
                <NewChatButton onClick={goToChatCreation} />
              </div>
            </div>
            <div className="chat">
              {!chat && (
                <NoChat
                  isLoading={isLoadingChat}
                  isError={isErrorChat}
                  error={errorChat?.response?.data.error || errorChat?.message}
                >
                  <ButtonAnchor onClick={goToChatCreation}>
                    Start chatting.
                  </ButtonAnchor>
                </NoChat>
              )}
              {chat && <Chat chat={chat} />}
            </div>
          </div>
        )}
        {isCreatingChat && (
          <CreateChatPageOverlay
            onCreateChat={onCreateChat}
            onClose={() => setIsCreatingChat(false)}
          />
        )}
      </Page>
    </AuthGuard>
  );
}
