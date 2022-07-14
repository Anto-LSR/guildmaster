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

function App() {
  const [user, setUser] = useState(null);
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  useEffect(() => {
    const am = ApiManager.getInstance();
    if (Helpers.isAuthenticated()){
      console.log('User is authenticated ! Getting user data...');
      let data = am.post("/auth/get-user").then((res) => {
        setUser(res.data);
        console.log(res.data);
      });
    }
   
  }, []);

  return (
    <BrowserRouter>
      <UserContext.Provider value={value}>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route path="/bnet" element={<BattlenetLogin />} />
          </Route>
          <Route path="/auth/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/bnet/auth" element={<RegisterForm />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
