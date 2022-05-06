import React, { useState } from "react";
import { Chat } from "../../../lib/models/chat";
import ChatCard from "../ChatCard/ChatCard";
import { FilterChatOrFindNewUser } from "../FilterChatOrFindNewUser/FilterChatOrFindNewUser";
import "./ChatList.scss";

interface Props {
  chats: Chat[];
}
export const ChatList: React.FC<Props> = ({ chats }) => {
  const [filter, setFilter] = useState("");

  return (
    <div className="ChatList">
      <FilterChatOrFindNewUser onFilter={setFilter} />
      <div className="list">
        <ul>
          {chats
            ?.filter((chat) => {
              if (filter === "") return true;
              const hasOnUsername = chat.users.find((user) =>
                user.userName.toLowerCase().includes(filter.toLocaleLowerCase())
              );
              if (hasOnUsername) return true;
              const hasOnMessages = chat.messages.find((message) =>
                message.message
                  .toLowerCase()
                  .includes(filter.toLocaleLowerCase())
              );
              return hasOnMessages;
            })
            .map((chat: Chat) => (
              <li key={chat._id} className="chat">
                <ChatCard chat={chat} filter={filter} />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ChatList;
