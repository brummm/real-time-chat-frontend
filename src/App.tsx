import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import ErrorMessage from "./components/ErrorMessage";
import Splash from "./components/Splash";
import {
  makeGet,
  useAutoLoadAPI
} from "./lib/api";

export const App: React.FC = () => {
  const navigate = useNavigate();
  const [loading, data, error] = useAutoLoadAPI(() => {
    return makeGet("/users/session");
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (data?.success) {
      navigate("/chats");
    }
    if (error || !data?.success) {
      setErrorMessage(
        "There was a error trying to check your user. Please, reload the application."
      );
    }
  }, [data, error]);

  if (errorMessage !== "") return <ErrorMessage message={errorMessage} />;

  return <Splash isLoading={loading} />;
};

export default App;
