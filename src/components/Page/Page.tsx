import React, { ReactElement } from "react";
import DefaultHeader from "../Header/Header";
import "./Page.scss";

export interface PageProps {
  variation?: "top" | "middle";
  header?: ReactElement;
}
export const Page: React.FC<PageProps> = ({
  children,
  variation = "middle",
  header,
}) => {
  const Header = header || <DefaultHeader />;

  return (
    <div className="page">
      {Header}
      <main className={`main ${variation}`}>{children}</main>
    </div>
  );
};
export default Page;
