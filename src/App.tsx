import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import Splash from "./components/Splash";
import {
  checkSession as checkSessionApi,
  makeGet,
  useAutoLoadAPI,
} from "./lib/api";

export const App: React.FC = () => {
  const navigate = useNavigate();
  const [loading, data, error] = useAutoLoadAPI(() => {
    return makeGet("/users/session");
  });
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (data.success) {
      navigate("/chats");
    } else {
      setErrorMessage(
        "There was a error trying to check your user. Please, reload the application."
      );
    }
  });

  return <Splash isLoading={loading} />;
};

export default App;
