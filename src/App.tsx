import React from "react";
import { QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { UserContext } from "./contexts/UserContext";
import { queryClient } from "./lib/queryClient";
import ChatsRoute from "./routes/chats";
import HomeRoute from "./routes/home";
import SignInRoute from "./routes/sign-in";
import SignUpRoute from "./routes/sign-up";

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <UserContext>
          <Routes>
            <Route path="/" element={<HomeRoute />} />
            <Route path="/sign-in" element={<SignInRoute />} />
            <Route path="/sign-up" element={<SignUpRoute />} />
            <Route path="/chats" element={<ChatsRoute />} />
            <Route path="/chats/:chatId" element={<ChatsRoute />} />
          </Routes>
        </UserContext>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
