import "./App.css";

import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <div className="flex flex-row">
        <Navbar />

        <Outlet />
      </div>
    </div>
  );
}

export default App;
