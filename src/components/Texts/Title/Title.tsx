import React from "react";
import './Title.scss';

export const Title: React.FC = ({ children }) => {
  return <h1 className="Title">{children}</h1>;
};

export default Title;
