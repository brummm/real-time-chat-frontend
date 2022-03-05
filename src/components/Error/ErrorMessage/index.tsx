import React from "react";

interface Props {
  message: string;
  details?: string;
}
export const ErrorMessage: React.FC<Props> = ({ message, details }) => {
  return (
    <div className="ErrorMessage">
      <h1 className="message">{message}</h1>
      {details !== undefined && <p className="details">{details}</p>}
    </div>
  );
};

export default ErrorMessage;
