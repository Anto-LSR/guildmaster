import { useState } from "react";
import { Outlet } from "react-router-dom";
import background from "../assets/img/background.jpg";

function ContentBlock() {
  return (
    <>
      <div
        className={"lg:block w-full bg-[#232739] h-full w-full   "}
        id="content"
        style={{
          backgroundImage: `url("${background}")`,
          backgroundSize: "cover",
          overflowY: "scroll",
        }}
      >
        <Outlet />
      </div>
    </>
  );
}

export default ContentBlock;
