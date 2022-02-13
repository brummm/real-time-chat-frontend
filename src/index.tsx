import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import ChatsRoute from "./routes/chats";
import NewChatRoute from "./routes/new-chat";
import SignInRoute from "./routes/sign-in";
import "./styles/global.scss";

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="sign-in" element={<SignInRoute />} />
        <Route path="chats" element={<ChatsRoute />} />
        <Route path="chat/new" element={<NewChatRoute />} />
      </Routes>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);
