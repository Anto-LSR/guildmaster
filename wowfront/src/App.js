import "./App.css";
import Navbar from "./components/Navbar";
import BattlenetLogin from "./components/BattlenetLogin";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ApiManager from "./services/ApiManager";

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="/bnet" element={<BattlenetLogin />} />
        </Route>
        <Route path="/auth/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
