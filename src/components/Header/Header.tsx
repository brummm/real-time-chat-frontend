import { Menu } from "./Menu";
import React from "react";
import Logo from "../Logo";
import "./Header.scss";

export const Header: React.FC = ({ children }) => {
  return (
    <>
      <header className="header">
        <div>
          {children === undefined && (
            <>
              <Logo
                backgroundColor="#F7F7F2"
                foregroundColor="#6E4597"
                width={31}
              />
              <h1 className="title">Real Time Chat</h1>
            </>
          )}
          {children}
          <Menu />
        </div>
      </header>
    </>
  );
};

export default Header;
