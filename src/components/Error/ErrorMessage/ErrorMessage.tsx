import { Error } from "@styled-icons/boxicons-solid";
import React from "react";
import "./ErrorMessage.scss";
import variables from '../../../styles/variables.scss';

interface Props {
  message: string;
  details?: string;
}
export const ErrorMessage: React.FC<Props> = ({ message, details }) => {
  return (
    <div className="ErrorMessage">
      <div className="message">
        <figure>
          <Error size={24} fill={variables.palleteError} />
        </figure>
        <span>{message}</span>
      </div>
      {details !== undefined && <p className="details">{details}</p>}
    </div>
  );
};

export default ErrorMessage;
