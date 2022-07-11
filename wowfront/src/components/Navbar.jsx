import React, { useEffect } from "react";
import axios from "axios";
import { BiShieldQuarter } from "react-icons/bi";
import { VscWorkspaceUnknown } from "react-icons/vsc";
import { FiLogOut } from "react-icons/fi";
import ApiManager from "../services/ApiManager";

function Navbar() {
  const [userCharacterData, setUserCharacterData] = React.useState("");

  useEffect(() => {
    if (!userCharacterData) {
      getUserCharacterData();
    }
  }, []);

  const getUserCharacterData = async () => {
    let apiManager = ApiManager.getInstance();
    //setUserCharacterData(await apiManager.get('user-info/selected-character'))
  };

  return (
    <div className=" w-64 bg-[#252525] h-screen">
      <div className="user-info flex m-5">
        <img
          src="https://render-eu.worldofwarcraft.com/character/hyjal/40/197426216-avatar.jpg"
          alt=""
          className="rounded border-2 border-white"
        />
        <div className="text-left pl-2 text-white">
          <p className="text-[#FFF468]">Ëver - Hyjal</p>
          <p className="text-[#E7B57A]">Ouroboros</p>
          <p>60</p>
        </div>
      </div>
      <button className="bg-primary hover:bg-[#2A7484] text-white font-bold py-2 px-4 border-b-4 border-[#2A7484] hover:border-[##2A7484] rounded transition ease-in-out">
        Change character
      </button>

      <ul className="mt-10 ml-10 text-white">
        <li className=" flex">
          <div className="flex items-center text-xl cursor-pointer  hover:text-primary  transition ease-in-out">
            <BiShieldQuarter className="mr-5" />
            My Guild &nbsp;
          </div>
          <div className="rounded-full bg-red-500 w-7  ">2</div>
        </li>
        <li className="nav-active-link flex items-center text-xl cursor-pointer hover:text-primary transition ease-in-out mt-3">
          <VscWorkspaceUnknown className="mr-5" />
          Find a guild
        </li>
      </ul>
      <a className="absolute bottom-5 left-10 text-white flex items-center hover:text-primary cursor-pointer">
        <FiLogOut /> &nbsp; Log out
      </a>
    </div>
  );
}

export default Navbar;
