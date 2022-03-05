import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { UserContext } from "./contexts/user-context";
import { User } from "./lib/models/user";
import ChatRoute from "./routes/chat";
import ChatsRoute from "./routes/chats";
import HomeRoute from "./routes/home";
import SignInRoute from "./routes/sign-in";

export const App: React.FC = () => {
  const [user, setUser] = useState<User | undefined>();
  return (
    <UserContext>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeRoute />} />
          <Route path="/sign-in" element={<SignInRoute />} />
          <Route path="/chats" element={<ChatsRoute />} />
          <Route path="/chats/:chatId" element={<ChatRoute />} />
        </Routes>
      </BrowserRouter>
    </UserContext>
  );
};

export default App;
