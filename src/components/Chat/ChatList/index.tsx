import React, { useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../../contexts/user-context";
import { Api, useAutoLoadAPI, useLoadAPI } from "../../../lib/api";
import { Chat } from "../../../lib/models/chat";
import { User } from "../../../lib/models/user";
import ErrorMessage from "../../Error/ErrorMessage";
import { ButtonLink } from "../../Form/Button";
import { Loading } from "../../Loading";
import NoData from "../../NoData";
import PageOverlay from "../../Page/PageOverlay";
import FindUser from "../../User/FindUser";

export const ChatList: React.FC = () => {
  const { user } = useUserContext();

  const navigate = useNavigate();
  const [loading, data, error] = useAutoLoadAPI((teste: string) => {
    return Api.get("/chats");
  });

  const [createChat, loadingCreateChat, dataCreateChat, errorCreateChat] =
    useLoadAPI((user: User) => {
      const userIds = [user._id];
      Api.post("/chats", { userIds });
    });

  const selectUserCallback = useCallback(
    (user: User) => {
      createChat(user);
    },
    [createChat]
  );

  useEffect(() => {
    if (dataCreateChat) {
      const { id } = dataCreateChat;
      navigate(`/chats/${id}`);
    }
  }, [dataCreateChat]);

  if (loading) return <Loading size="medium" />;
  if (error) return <ErrorMessage message="There was a error" />;
  if (!data) return null;

  const { chats } = data;

  if (chats.length === 0)
    return (
      <NoData>
        <p>You still have no chats.</p>
        <ButtonLink href="#new-chat">Start One</ButtonLink>
        <PageOverlay title="Find user to start chatting" hash="#new-chat">
          <FindUser selectUserCallback={selectUserCallback} />
          {loadingCreateChat && <Loading />}
        </PageOverlay>
      </NoData>
    );

  return (
    <>
      <ul>
        {chats.map((chat: Chat) => (
          <li key={chat._id}>
            <Link to={`/chats/${chat._id}`}>
              {chat.users
                .filter((userInChat) => userInChat._id !== user?._id)
                .map((user, index) => (
                  <p key={index}>@{user.userName}</p>
                ))}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ChatList;
