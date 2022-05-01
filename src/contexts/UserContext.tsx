import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import axios from "../lib/axios";
import { User } from "../lib/models/user";

interface IUserContext {
  user?: User;
  isReady: boolean;
  setUser: (user: User | undefined) => void;
  logout: () => Promise<boolean>;
  logoutLoading: boolean;
}
const Context = createContext<IUserContext>({} as IUserContext);

const SESSION_STORAGE_kEY = "UserData";
const getUserFromSessionStorage = (): User | undefined => {
  const data = window.sessionStorage.getItem(SESSION_STORAGE_kEY);
  if (!data) return undefined;
  return JSON.parse(data) as User;
};

export const UserContext: React.FC = ({ children }) => {
  const navigate = useNavigate();
  const initialUser = getUserFromSessionStorage();
  const [user, setUserState] = useState<User | undefined>(initialUser);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const setUser = useCallback((user: User | undefined) => {
    if (user !== undefined) {
      window.sessionStorage.setItem(SESSION_STORAGE_kEY, JSON.stringify(user));
    } else {
      window.sessionStorage.removeItem(SESSION_STORAGE_kEY);
    }
    setUserState(user);
  }, []);

  const { mutate: callLogout, isLoading: logoutLoading } = useMutation(
    async () => {
      await axios.post(`/users/logout`);
    }
  );
  const logout = useCallback(async () => {
    try {
      await callLogout();
      setUser(undefined);
      navigate("/");
      return true;
    } catch (e) {
      return false;
    }
  }, [callLogout, navigate, setUser]);
  return (
    <Context.Provider value={{ user, isReady, setUser, logout, logoutLoading }}>
      {children}
    </Context.Provider>
  );
};

export const useUserContext = () => useContext(Context);

export default UserContext;
