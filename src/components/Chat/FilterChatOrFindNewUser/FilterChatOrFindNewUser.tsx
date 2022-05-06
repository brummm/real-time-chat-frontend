import React, { useRef } from "react";
import "./FilterChatOrFindNewUser.scss";

interface Props {
  onFilter: (filter: string) => void;
}
export const FilterChatOrFindNewUser: React.FC<Props> = ({ onFilter }) => {
  const filter = useRef<string>();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value !== undefined) {
      filter.current = e.target.value;
      onFilter(filter.current);
    }
  }

  return (
    <div className="FilterChatOrFindNewUser">
      <form>
        <div className="input">
          <input
            type="text"
            onChange={handleChange}
            placeholder="Filter recent messages or users."
          />
        </div>
      </form>
    </div>
  );
};
