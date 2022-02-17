import React from "react";
import { makeGet, useAutoLoadAPI } from "../../../lib/api";
import ErrorMessage from "../../ErrorMessage";
import { ButtonLink } from "../../Form/Button";
import { Loading } from "../../Loading";
import NoData from "../../NoData";
import PageOverlay from "../../Page/PageOverlay";
import FindUser from "../../User/FindUser";

export const ChatList: React.FC = () => {
  const [loading, data, error] = useAutoLoadAPI(() => {
    return makeGet("/chats");
  });

  if (loading) return <Loading size="medium" />;
  if (error) return <ErrorMessage message="There was a error" />;
  if (!data) return null;
  if (data.chats.length === 0)
    return (
      <NoData>
        <p>You still have no chats.</p>
        <ButtonLink href="#new-chat">Start One</ButtonLink>
        <PageOverlay title='Find user to start chatting' hash="#new-chat">
					<FindUser />
				</PageOverlay>
      </NoData>
    );

  return (
    <>
      <p>{data.length}</p>
    </>
  );
};

export default ChatList;
