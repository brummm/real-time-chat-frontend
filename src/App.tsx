import React, { useEffect, useState } from "react";
import "./App.css";
import SignInOrSignUp from "./components/SignInOrSignUp";
import Splash from "./components/Splash";
import { checkSession } from "./lib/api";

export const App: React.FC = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    checkSession().then(response => {
      setIsLoading(false);
      if (response === null) {
        setErrorMessage("There was a error trying to check your user. Please, reload the application.");
        return;
      }
      if (response === true) {
        setIsLogged(true);
      }
    })
  }, [])


  return (<div className="App">
    {errorMessage && <p>{errorMessage}</p>}
    {isLoading && <Splash />}
    {!isLogged && <SignInOrSignUp /> }
    {isLogged && <p>ta logado</p>}
    </div>);
}

export default App;
