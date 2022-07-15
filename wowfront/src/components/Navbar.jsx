import React, { useEffect, useState, useContext } from "react";
import { BiShieldQuarter } from "react-icons/bi";
import { VscWorkspaceUnknown } from "react-icons/vsc";
import { FiLogOut } from "react-icons/fi";
import ApiManager from "../services/ApiManager";
import { Link, Outlet, useSearchParams } from "react-router-dom";
import { UserContext } from "../services/UserContext";
import { CharacterContext } from "../services/CharacterContext";

function Navbar() {
  const apiManager = ApiManager.getInstance();
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [characterData, setCharacterData] = useState({});

  const { user, setUser } = useContext(UserContext);
  const { character, setCharacter } = useContext(CharacterContext);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      console.log(character);
      setLoading(false);
    };

    fetchData();
  }, []);

  //console.log(characterData);

  return (
    <div className="App">
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <Link to="/auth/login"> coucou</Link>
      <div className="flex flex-row">
        <div className=" w-64 bg-[#252525] h-screen">
          <div className="user-info flex m-5">
            <img
              src="https://render-eu.worldofwarcraft.com/character/hyjal/40/197426216-avatar.jpg"
              alt=""
              className="rounded border-2 border-white"
            />
            <div className="text-left pl-2 text-white">
              <p className="text-[#FFF468]">
                {characterData.name + " - " + characterData.realm?.name}
              </p>
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
          {user && (
            <a className="absolute bottom-5 left-10 text-white flex items-center hover:text-primary cursor-pointer">
              <FiLogOut /> &nbsp; Log out
            </a>
          )}
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default Navbar;
