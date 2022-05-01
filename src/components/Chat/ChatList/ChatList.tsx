import { AxiosError } from "axios";
import React, { useCallback, useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import axios from "../../../lib/axios";
import { Chat } from "../../../lib/models/chat";
import { User } from "../../../lib/models/user";
import ErrorMessage from "../../Error/ErrorMessage/ErrorMessage";
import { ButtonAnchor } from "../../Form/Button/Button";
import { Loading } from "../../Loading/Loading";
import NoData from "../../NoData/NoData";
import PageOverlay from "../../Page/PageOverlay/PageOverlay";
import FindUser from "../../User/FindUser/FindUser";
import ChatCard from "../ChatCard/ChatCard";
import NewChatButton from "../NewChatButton/NewChatButton";
import "./ChatList.scss";

const NEW_CHAT_ANCHOR = "#new-chat";

export const ChatList: React.FC = () => {
  const navigate = useNavigate();
  const {
    data: chats,
    isLoading,
    isError,
    error,
  } = useQuery<Chat[], AxiosError>("CHATS", async () => {
    const { data } = await axios.get("/chats");
    return data.chats;
  });

  const {
    mutate: createChat,
    data: dataCreateChat,
    isError: isErrorCreateChat,
    error: errorCreateChat,
    isLoading: isLoadingCreateChat,
  } = useMutation<Chat, AxiosError, { userIds: string[] }>(
    async (params): Promise<Chat> => {
      const { data } = await axios.post("/chats", params);
      return data.chat;
    }
  );

  const selectUserCallback = useCallback(
    (user: User) => {
      createChat({ userIds: [user._id] });
    },
    [createChat]
  );

  const onFindUserClose = useCallback(() => {
    // TODO: test if the states are cleaned after save
  }, []);

  useEffect(() => {
    if (dataCreateChat) {
      const { _id } = dataCreateChat;
      navigate(`/chats/${_id}`);
    }
  }, [dataCreateChat, navigate]);

  const findUserPageOverlay = (
    <PageOverlay
      title="Find user to start chatting"
      hash="#new-chat"
      onClose={onFindUserClose}
    >
      <FindUser selectUserCallback={selectUserCallback} />
      {isLoadingCreateChat && <Loading />}
      {isErrorCreateChat && errorCreateChat && (
        <ErrorMessage message={errorCreateChat.message} />
      )}
    </PageOverlay>
  );

  if (chats?.length === 0)
    return (
      <NoData>
        <p>You still have no chats.</p>
        <ButtonAnchor href={NEW_CHAT_ANCHOR}>Start One</ButtonAnchor>
        {findUserPageOverlay}
      </NoData>
    );

  return (
    <div className="ChatList">
      {isLoading && <Loading size="small" />}
      {isError && error && <ErrorMessage message={error.message} />}
      <ul className="list">
        {chats?.map((chat: Chat) => (
          <li key={chat._id} className="chat">
            <ChatCard chat={chat} />
          </li>
        ))}
      </ul>

      <div className="newChatButton">
        <NewChatButton href={NEW_CHAT_ANCHOR} />
      </div>
      {findUserPageOverlay}
    </div>
  );
};

export default ChatList;
