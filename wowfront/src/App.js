import "./App.css";
import Navbar from "./components/Navbar";
import BattlenetLogin from "./components/BattlenetLogin";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ApiManager from "./services/ApiManager";
import { React, useState } from "react";
import { UserContext } from "./services/UserContext";
import { useMemo, useEffect } from "react";
import { Helpers } from "./services/Helpers.js";
import { CharacterContext } from "./services/CharacterContext";

function App() {
  const [user, setUser] = useState(null);
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  const [character, setCharacter] = useState(null);
  const characterValue = useMemo(() => ({ character, setCharacter }));

  useEffect(() => {
    const am = ApiManager.getInstance();
    if (Helpers.isAuthenticated()) {
      let data = am.post("/auth/get-user").then((res) => {
        const user = res.data;

        if (user.selectedCharacter) {
          let character = am
            .get("/character/selected-character")
            .then((res) => {
              character = res.data;
              setCharacter(character);
            });
        } else {
          setUser(user);
        }
      });
    }
  }, []);

  return (
    <BrowserRouter>
      <UserContext.Provider value={value}>
        <CharacterContext.Provider value={characterValue}>
          <Routes>
            <Route path="/" element={<Navbar />}>
              <Route path="/bnet" element={<BattlenetLogin />} />
            </Route>
            <Route path="/auth/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/bnet/auth" element={<RegisterForm />} />
          </Routes>
        </CharacterContext.Provider>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
