import React from "react";
import "./OutsideContainer.scss";

export const OutsideContainer: React.FC = ({ children }) => {
  return <div className="OutsideContainer">{children}</div>;
};

export default OutsideContainer;
