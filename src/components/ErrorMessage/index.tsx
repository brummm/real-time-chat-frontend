import React from "react";
import PageOverlay from "../Page/PageOverlay";

interface Props {
  message: string;
  details?: string;
}
export const ErrorMessage: React.FC<Props> = ({ message, details }) => {
  return (
    <PageOverlay hash="error">
      <div className="ErrorMessage">
        <h1 className="message">{message}</h1>
        {details !== undefined && <p className="details">{details}</p>}
      </div>
    </PageOverlay>
  );
};

export default ErrorMessage;
