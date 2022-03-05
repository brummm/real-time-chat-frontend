import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Splash from "../components/Splash";
import { useAutoLoadAPI, Api } from "../lib/api";

function HomeRoute() {
  const navigate = useNavigate();
  const [loading, data, error] = useAutoLoadAPI(() => {
    return Api.get("/users/session");
  });

  useEffect(() => {
    if (data?.success) {
      navigate("/chats");
    }
    if (!data?.success || error) {
      navigate("sign-in");
    }
  }, [data, error, navigate]);

  return <Splash isLoading={loading} />;
}

export default HomeRoute;
