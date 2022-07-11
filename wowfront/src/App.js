import "./App.css";

import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    
    <div className="App">
      <div>
        <Navbar/>
        <div className="content">
        <Outlet />
        </div>
      </div>
      
    </div>
  );
}

export default App;
