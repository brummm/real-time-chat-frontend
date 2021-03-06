import {
  DotsVertical,
  HomeSmile,
  LogOutCircle,
} from "@styled-icons/boxicons-regular";
import React, { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import variables from "../../../styles/variables.scss";
import Credits from "../../Credits/Credits";
import { PageOverlayHashed } from "../../Page/PageOverlay/PageOverlay";
import "./MenuHeader.scss";

export const MenuHeader: React.FC = () => {
  const { signOut, user } = useAuth();
  const [opened, setOpened] = useState(false);
  const [showCredits, setShowCredits] = useState(false);
  const openMenu = () => {
    setOpened(true);
  };
  const closeMenu = () => {
    setOpened(false);
  };

  return (
    <>
      <nav className="MenuHeader">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            openMenu();
          }}
        >
          <DotsVertical width={30} height={30} fill={variables.pallete4} />
        </button>
        {opened && (
          <div
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              closeMenu();
            }}
          ></div>
        )}
        <ul className={opened ? "opened" : ""}>
          {user && (
            <li>
              <button
                onClick={() => {
                  signOut();
                }}
              >
                <LogOutCircle size={26} fill={variables.pallete4} />
                Logout
              </button>
            </li>
          )}
          <li>
            <a
              href="#credits"
              onClick={() => {
                setOpened(false);
                setShowCredits(true);
              }}
            >
              <HomeSmile size={26} fill={variables.pallete4} /> Credits
            </a>
          </li>
        </ul>
      </nav>
      <PageOverlayHashed
        hash="#credits"
        title="Who made it?"
        onClose={() => setShowCredits(false)}
      >
        {showCredits && <Credits />}
      </PageOverlayHashed>
    </>
  );
};

export default MenuHeader;
