import React, { useEffect, useState } from "react";
import Header from "../Header";
import "./Page.scss";

export const Page: React.FC = ({ children }) => {
  const [shrink, setShrink] = useState(false);


  return (
    <div className="page">
      <Header></Header>
      <main className="main">{children}</main>
    </div>
  );
};
export default Page;
