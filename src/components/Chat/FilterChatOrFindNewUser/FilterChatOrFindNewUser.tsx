import React, { useRef } from "react";
import { User } from "../../../lib/models/user";
import "./FilterChatOrFindNewUser.scss";

interface Props {
  onFilter: (filter: string) => void;
  onUserSelect: (user: User) => Promise<void>;
}
export const FilterChatOrFindNewUser: React.FC<Props> = ({
  onFilter,
  onUserSelect,
}) => {
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
