import "./App.css";
import Navbar from "./components/Navbar";
import BattlenetLogin from "./components/BattlenetLogin";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { React } from "react";

import UserInfoContextProvider from "./contexts/UserInfoContext";
import CharacterSelection from "./components/CharacterSelection";
import UserProfile from "./components/UserProfile";
import MainContainer from "./components/MainContainer";
import ContentBlock from "./components/ContentBlock";
import toast, { Toaster } from 'react-hot-toast';

const notify = () => toast('Here is your toast.');
function App() {
  return (
    <BrowserRouter>
      <UserInfoContextProvider>
        <Routes>
          <Route path="" element={<MainContainer />}>
            <Route path="/" element={<ContentBlock />}>
              <Route path="/bnet" element={<BattlenetLogin />} />
              <Route path="/my-characters" element={<CharacterSelection />} />
              <Route path="/auth/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/my-profile" element={<UserProfile />} />
            </Route>
          </Route>
        </Routes>
      </UserInfoContextProvider>
    </BrowserRouter>
  );
}

export default App;
