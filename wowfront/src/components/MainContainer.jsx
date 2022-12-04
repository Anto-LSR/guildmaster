import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function MainContainer() {
  return (
    <div className="App">
      <div className="flex flex-row h-screen">
        <Toaster
          position="bottom-right"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            

            // Default options for specific types 
            success: {
              duration: 3000,
              style: {
                background: '#166534',
                color: 'white',
              },
            },
            error: {
              duration: 3000,
              style: {
                background: '#991b1b',
                color: 'white',
              },
            },
          }}
        />
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}

export default MainContainer;
