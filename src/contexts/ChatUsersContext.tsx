import { createContext } from "react";
import { User } from "../lib/models/user";

interface IChatUsersContext {
  users: User[]
}
export const ChatUsersContext = createContext<IChatUsersContext>({} as IChatUsersContext);
