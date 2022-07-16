import React, { useEffect, useState, useContext } from "react";
import { BiShieldQuarter } from "react-icons/bi";
import { VscWorkspaceUnknown } from "react-icons/vsc";
import { FiLogOut, FiLogIn } from "react-icons/fi";
import { GiCrenelCrown } from "react-icons/gi";
import { HiMenu } from "react-icons/hi";

import { MdClose } from "react-icons/md";

import { Link, Outlet } from "react-router-dom";
import { UserInfoContext } from "../contexts/UserInfoContext";

function Navbar() {
  const { userInfo, setUserInfo, characterData, setCharacterData } =
    useContext(UserInfoContext);

  const [navBarToggled, setNavBarToggled] = useState(false);
  return (
    <div className="App">
      <div className="flex flex-row">
        <div
          className={
            navBarToggled
              ? "w-screen bg-[#252525] h-screen  lg:w-64"
              : "hidden bg-[#252525] h-screen  left-0 lg:block lg:w-80"
          }
          toggled={navBarToggled.toString()}
        >
          <MdClose
            className="text-2xl absolute right-2 top-2 text-white lg:hidden"
            onClick={() => {
              setNavBarToggled(false);
            }}
          />
          <div className="flex flex-col items-center border-0 border-b border-solid bg-primary">
            <GiCrenelCrown className="text-white font-bold text-4xl " />
            <h1 className="font-bold text-4xl text-white mb-2">Guild Master</h1>
          </div>
          {characterData && (
            <div>
              <div className="user-info flex m-5">
                <img
                  src={characterData?.avatar}
                  alt=""
                  className="rounded border-2 border-white"
                />
                <div className="text-left pl-2 text-white">
                  <p
                    className={
                      "text-" +
                      characterData?.character_class.name
                        .toLowerCase()
                        .replaceAll(" ", "") +
                      "color"
                    }
                  >
                    {characterData?.name}
                  </p>

                  <p>{characterData?.realm.name}</p>
                  <p className="text-[#E7B57A]">{characterData?.guild?.name}</p>
                  <p>{characterData?.level}</p>
                </div>
              </div>

              <Link
                to="my-characters"
                className="bg-primary hover:bg-[#2A7484] text-white font-bold py-2 px-4 border-b-4 border-[#2A7484] hover:border-[##2A7484] rounded transition ease-in-out"
                onClick={() => {
                  setNavBarToggled(false);
                }}
              >
                Change character
              </Link>
            </div>
          )}
          <ul className="mt-10 ml-10 text-white">
            <li className=" flex">
              {characterData && (
                <div className="flex">
                  <div className="flex items-center text-xl cursor-pointer  hover:text-primary  transition ease-in-out">
                    <BiShieldQuarter className="mr-5" />
                    My Guild &nbsp;
                  </div>

                  <div className="rounded-full bg-red-500 w-7  ">2</div>
                </div>
              )}

              {!characterData && (
                <div>
                  <div className="flex items-center text-xl cursor-pointer  hover:text-primary  transition ease-in-out">
                    <Link to="/auth/login" className="flex items-center">
                      <FiLogIn className="mr-5" />
                      Login &nbsp;
                    </Link>
                  </div>
                </div>
              )}
            </li>
            <li className="nav-active-link flex items-center text-xl cursor-pointer hover:text-primary transition ease-in-out mt-3">
              <VscWorkspaceUnknown className="mr-5" />
              Find a guild
            </li>
          </ul>
          {userInfo && (
            <a className="absolute bottom-5 left-10 text-white flex items-center hover:text-primary cursor-pointer">
              <FiLogOut /> &nbsp; Log out
            </a>
          )}
        </div>

        <div
          className={
            navBarToggled
              ? "hidden lg:hidden"
              : "text-2xl absolute left-2 top-2 lg:hidden"
          }
        >
          <HiMenu
            onClick={() => {
              setNavBarToggled(true);
            }}
            className="text-white cursor-pointer"
          />
        </div>
        <div
          className={
            navBarToggled
              ? "hidden lg:block bg-[#232739] h-full w-full"
              : "lg:block w-full bg-[#232739] h-full w-full md:h-screen  lg:h-screen"
          }
          id="content"
        >
          <Outlet />
        </div>
      </div>

      {/* {!characterData && (
        <div className="flex items-center justify-center h-screen w-screen bg-[#252525]">
          <button
            disabled
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
          >
            <svg
              role="status"
              className="inline mr-3 w-4 h-4 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="red-500"
              />
            </svg>
            Loading...
          </button>
        </div>
      )} */}
    </div>
  );
}

export default Navbar;
