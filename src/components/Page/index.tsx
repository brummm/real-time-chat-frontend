import React, { useEffect, useState } from "react";
import Header from "../Header";
import "./Page.scss";

export interface PageProps {
  variation?: "top" | "middle"
}
export const Page: React.FC<PageProps> = ({ children, variation="middle" }) => {

  return (
    <div className="page">
      <Header />
      <main className={`main ${variation}`}>{children}</main>
    </div>
  );
};
export default Page;
