import React from "react";
import { useNavigate } from "react-router-dom";
import { makeGet, useAutoLoadAPI } from "../../../lib/api";
import Button from "../../Form/Button";
import { Loading } from "../../Loading";
import NoData from "../../NoData";

export const ChatList: React.FC = () => {
  const [loading, data, error] = useAutoLoadAPI(() => {
    return makeGet("/chats");
  });

  const navigate = useNavigate();

  if (loading) return <Loading size="medium" />;
  // TODO: make error component
  if (error) return <p>There was a error</p>;
  if (!data) return null;
  if (data.chats.length === 0)
    return (
      <NoData>
        <p>You still have no chats.</p>
        <Button
          type="button"
          label="Start One"
          onClick={() => {
            navigate("/chat/new");
          }}
        />
      </NoData>
    );

  return (
    <>
      <p>{data.length}</p>
    </>
  );
};

export default ChatList;
