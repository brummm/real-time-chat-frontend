import React from "react";
import { useParams } from "react-router-dom";
import Page from "../components/Page";

export const ChatRoute: React.FC = (props) => {
  const { username } = useParams();

  return (
    <Page variation="top">
      <h1>{username}</h1>
    </Page>
  );
};

export default ChatRoute;
