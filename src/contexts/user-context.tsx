import React, { createContext, useCallback, useContext, useState } from "react";
import { User } from "../lib/models/user";

interface IUserContext {
  user?: User;
  setUser: (user: User) => void;
}
const Context = createContext<IUserContext>({} as IUserContext);


const LOCAL_STORAGE_kEY = 'UserData';
const getUserFromLocalStorage = (): User | undefined => {
  const data = window.localStorage.getItem(LOCAL_STORAGE_kEY);
  if (!data) return undefined;
  return JSON.parse(data) as User;
};

export const UserContext: React.FC = ({ children }) => {
  const initialUser = getUserFromLocalStorage();
  const [user, setUserState] = useState<User | undefined>(initialUser);
  const setUser = useCallback((user: User) => {
    window.localStorage.setItem(LOCAL_STORAGE_kEY, JSON.stringify(user))
    setUserState(user)
  }, [])
  return (
    <Context.Provider value={{ user, setUser }}>{children}</Context.Provider>
  );
};

export const useUserContext = () => useContext(Context);

export default UserContext;
