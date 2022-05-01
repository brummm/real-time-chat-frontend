import { AxiosError } from "axios";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import Splash from "../components/Splash/Splash";
import { useUserContext } from "../contexts/UserContext";
import axios from "../lib/axios";
import { User } from "../lib/models/user";

function HomeRoute() {
  const navigate = useNavigate();
  const { user: userInContext, setUser, isReady } = useUserContext();
  const {
    isLoading,
    data: user,
    error,
  } = useQuery<User, AxiosError>(
    "SESSION",
    async () => {
      const { data } = await axios.get("/users/session");
      return data.user;
    },
    { enabled: isReady && !userInContext }
  );

  useEffect(() => {
    if (userInContext) {
      navigate("/chats");
    }
  }, [user, navigate, userInContext]);

  useEffect(() => {
    if (error) {
      navigate("sign-in");
    }
  }, [error, navigate]);

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [setUser, user]);

  return <Splash isLoading={isLoading} />;
}

export default HomeRoute;
