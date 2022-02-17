import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import ChatRoute from "./routes/chat";
import ChatsRoute from "./routes/chats";
import SignInRoute from "./routes/sign-in";
import "./styles/global.scss";

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="sign-in" element={<SignInRoute />} />
        <Route path="chats" element={<ChatsRoute />} />
        <Route path="chats/:username" element={<ChatRoute />} />
      </Routes>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);
