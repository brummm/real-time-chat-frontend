import { AxiosError } from "axios";
import platform from "platform";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useMutation, UseMutationResult } from "react-query";
import axios from "../lib/axios";
import { User } from "../lib/models/user";

interface ISignIn {
  email: string;
  password: string;
  equipmentId?: string;
}
interface AuthContextProps {
  isReady: boolean;
  isAuthenticated: boolean;
  user?: User;
  setUser: (user: User) => void;
  signOut: () => Promise<void>;
  signInMutation: UseMutationResult<
    User,
    AxiosError<any, any>,
    ISignIn,
    unknown
  >;
  checkSession: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextProps>({
  isReady: false,
  isAuthenticated: false,
} as AuthContextProps);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context)
    throw new Error("AuthContext must be placed within AuthProvider");

  return context;
};

export const AuthProvider: React.FC = ({ children }) => {
  const [isReady, setIsReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User>();

  const signInMutation = useMutation<User, AxiosError, ISignIn>(
    async (payload: ISignIn): Promise<User> => {
      if (!payload.equipmentId) {
        payload.equipmentId = platform.description;
      }
      const { data } = await axios.post("/users/login", payload);
      const { user, error } = data;
      if (!user) {
        throw Error(error || "An error occurred while trying to sign-in.");
      }
      setUser(user);
      setIsAuthenticated(true);
      setIsReady(true);
      return user;
    }
  );

  const checkSession = useCallback(async () => {
    setIsReady(false);
    let _isAutheticated = false;
    let _user = null;
    try {
      const { data } = await axios.get("/users/session");
      _user = data.user;
      if (!_user) {
        throw Error();
      }
      _isAutheticated = true;
    } catch (err: any) {
      _isAutheticated = false;
    } finally {
      setUser(_user);
      setIsAuthenticated(_isAutheticated);
      setIsReady(true);
      return _isAutheticated;
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      await axios.post("/users/logout");
      setIsAuthenticated(false);
      setUser(undefined);
    } catch (err: any) {
      throw err;
    }
  }, []);

  useEffect(() => {
    checkSession();
  }, [checkSession]);
  return (
    <AuthContext.Provider
      value={{
        isReady,
        isAuthenticated,
        user,
        setUser,
        signOut,
        signInMutation,
        checkSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
