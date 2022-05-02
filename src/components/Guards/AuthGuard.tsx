import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Loading from "../Loading/Loading";
import { REDIRECT_ATTR_NAME } from "../User/SignInOrSignUp/SignIn/SignIn";

interface Props {
  role?: string;
  signInPath: string;
}
const AuthGuard: React.FC<Props> = ({ children, role, signInPath }) => {
  const { isAuthenticated, isReady, user, signOut } = useAuth();
  const navigate = useNavigate();

  const redirect = useCallback(() => {
    const { href } = window.location;
    const url = new URL(href);
    if (!url.searchParams.get(REDIRECT_ATTR_NAME)) {
      let urlToRedirect = `${signInPath}?${REDIRECT_ATTR_NAME}=${href}`;
      navigate(urlToRedirect);
    }
  }, [navigate, signInPath]);

  useEffect(() => {
    const userRoleIsValid = role === undefined || role === user?.role;

    if (isReady && (!user || !userRoleIsValid)) {
      signOut();
      redirect();
    }
  }, [isReady, navigate, redirect, role, signOut, user]);

  if (!isReady) {
    return <Loading />;
  }

  return <>{children}</>;
};

export default AuthGuard;
