import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAutoLoadAPI, useLoadAPI } from "../../../lib/api";
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
  const { loading, data, error } = useAutoLoadAPI(() => {
    return axios.get("/chats");
  });

  let {
    call: createChat,
    loading: loadingCreateChat,
    data: dataCreateChat,
    error: errorCreateChat,
    clearStates: clearCreateChatStates,
  } = useLoadAPI((userIds: string[]) => axios.post("/chats", { userIds }));

  const selectUserCallback = useCallback(
    (user: User) => {
      createChat([user._id]);
    },
    [createChat]
  );

  const onFindUserClose = useCallback(() => {
    clearCreateChatStates();
  }, [clearCreateChatStates]);

  useEffect(() => {
    if (dataCreateChat) {
      const { id } = dataCreateChat;
      navigate(`/chats/${id}`);
    }
  }, [dataCreateChat, navigate]);

  if (loading) return <Loading size="medium" />;
  if (error) return <ErrorMessage message={error} />;
  if (!data) return null;

  const { chats } = data;

  const findUserPageOverlay = (
    <PageOverlay
      title="Find user to start chatting"
      hash="#new-chat"
      onClose={onFindUserClose}
    >
      <FindUser selectUserCallback={selectUserCallback} />
      {loadingCreateChat && <Loading />}
      {errorCreateChat && <ErrorMessage message={errorCreateChat} />}
    </PageOverlay>
  );

  if (chats.length === 0)
    return (
      <NoData>
        <p>You still have no chats.</p>
        <ButtonAnchor href={NEW_CHAT_ANCHOR}>Start One</ButtonAnchor>
        {findUserPageOverlay}
      </NoData>
    );

  return (
    <div className="ChatList">
      <ul className="list">
        {chats.map((chat: Chat) => (
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
