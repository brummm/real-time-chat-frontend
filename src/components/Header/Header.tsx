import React from "react";
import variables from '../../styles/variables.scss';
import Logo from "../Logo";
import "./Header.scss";
import { MenuHeader } from "./MenuHeader/MenuHeader";

export const Header: React.FC = ({ children }) => {
  return (
    <>
      <header className="header">
        <div>
          {children === undefined && (
            <>
              <Logo
                backgroundColor={variables.pallete4}
                foregroundColor={variables.pallete0}
                width={31}
              />
              <h1 className="title">Real Time Chat</h1>
            </>
          )}
          {children}
          <MenuHeader />
        </div>
      </header>
    </>
  );
};

export default Header;
