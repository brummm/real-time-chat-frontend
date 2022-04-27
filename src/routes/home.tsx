import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Splash from "../components/Splash/Splash";
import { useUserContext } from "../contexts/UserContext";
import { useLoadAPI } from "../lib/api";
import axios from "../lib/axios";

function HomeRoute() {
  const navigate = useNavigate();
  const { user, setUser } = useUserContext();
  const [call, loading, data, error] = useLoadAPI(() =>
    axios.get("/users/session")
  );

  useEffect(() => {
    if (user) {
      navigate("/chats");
    } else {
      call();
    }
  }, [user, call, navigate]);

  useEffect(() => {
    if (error) {
      navigate("sign-in");
    }
  }, [error, navigate]);

  useEffect(() => {
    if (data) {
      const { user } = data;
      if (user) {
        setUser(user);
      }
    }
  }, [data, setUser]);

  return <Splash isLoading={loading} />;
}

export default HomeRoute;
