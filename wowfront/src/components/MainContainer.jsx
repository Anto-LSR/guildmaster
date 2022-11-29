import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function MainContainer() {
    return(
        <div className="App">
            <div className="flex flex-row">
                <Navbar />
                <Outlet />
            </div>
        </div>
    )
}

export default MainContainer;

