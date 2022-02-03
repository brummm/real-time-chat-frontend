import { DotsVertical } from "@styled-icons/boxicons-regular";
import React, { useState } from "react";

export const Menu: React.FC = () => {
  const [opened, setOpened] = useState(false);
  const openMenu = () => {
    setOpened(true);
  };
  const closeMenu = () => {
    setOpened(false);
  };
  return (
    <nav>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          openMenu();
        }}
      >
        <DotsVertical width={30} height={30} color="#F7F7F2" />
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
        <li>Credits</li>
      </ul>
    </nav>
  );
};

export default Menu;
