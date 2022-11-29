import { useState } from "react";
import { Outlet } from "react-router-dom";
import background from "../assets/img/background.jpg";

function ContentBlock() {
  const [navBarToggled, setNavBarToggled] = useState(false);
  return (
    <>
      <div
        className={
          navBarToggled
            ? "hidden lg:block bg-[#232739] h-full w-full"
            : "lg:block w-full bg-[#232739] h-screen w-full   "
        }
        id="content"
        style={{
          backgroundImage: `url("${background}")`,
          backgroundSize: "cover",
        }}
      >
        <Outlet/>
      </div>
    </>
  );
}

export default ContentBlock;
