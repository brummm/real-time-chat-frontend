import { AxiosError } from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import axios from "../../../lib/axios";
import { Chat } from "../../../lib/models/chat";
import { User } from "../../../lib/models/user";
import ErrorMessage from "../../Error/ErrorMessage/ErrorMessage";
import { ButtonAnchor } from "../../Form/Button/Button";
import { Loading, LoadingCentered } from "../../Loading/Loading";
import NoData from "../../NoData/NoData";
import PageOverlay from "../../Page/PageOverlay/PageOverlay";
import FindUser from "../../User/FindUser/FindUser";
import ChatCard from "../ChatCard/ChatCard";
import { FilterChatOrFindNewUser } from "../FilterChatOrFindNewUser/FilterChatOrFindNewUser";
import NewChatButton from "../NewChatButton/NewChatButton";
import "./ChatList.scss";

const NEW_CHAT_ANCHOR = "#new-chat";
const REFECTH_INTERVAL = 5000;

export const ChatList: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");
  const {
    data: chats,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<Chat[], AxiosError>("CHATS", async () => {
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
    async (user: User) => {
      await createChat({ userIds: [user._id] });
    },
    [createChat]
  );

  const onFindUserClose = useCallback(() => {
    // TODO: test if the states are cleaned after save
  }, []);

  useEffect(() => {
    console.log(dataCreateChat);

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
      <FilterChatOrFindNewUser
        onFilter={setFilter}
        onUserSelect={selectUserCallback}
      />
      <div className="list">
        {isLoading && <LoadingCentered size="small" />}
        {isError && error && <ErrorMessage message={error.message} />}
        <ul>
          {chats
            ?.filter((chat) => {
              if (filter === "") return true;
              const hasOnUsername = chat.users.find((user) =>
                user.userName.toLowerCase().includes(filter.toLocaleLowerCase())
              );
              if (hasOnUsername) return true;
              const hasOnMessages = chat.messages.find((message) =>
                message.message
                  .toLowerCase()
                  .includes(filter.toLocaleLowerCase())
              );
              return hasOnMessages;
            })
            .map((chat: Chat) => (
              <li key={chat._id} className="chat">
                <ChatCard chat={chat} filter={filter} />
              </li>
            ))}
        </ul>
      </div>

      {/* <div className="newChatButton">
        <NewChatButton href={NEW_CHAT_ANCHOR} />
      </div> */}
      {findUserPageOverlay}
    </div>
  );
};

export default ChatList;
