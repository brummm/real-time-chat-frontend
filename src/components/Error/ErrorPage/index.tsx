import React from "react";
import Page from "../../Page";
import ErrorMessage from "../ErrorMessage";

export const ErrorPage: React.FC<{ message: string }> = ({ message }) => {
  return (
    <Page variation="middle">
      <ErrorMessage message={message} />
    </Page>
  );
};

export default ErrorPage;
