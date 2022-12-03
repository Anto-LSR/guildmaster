import React, { useEffect, useState, useContext } from "react";

import { BiShieldQuarter } from "react-icons/bi";
import { VscWorkspaceUnknown } from "react-icons/vsc";
import { FiLogOut, FiLogIn } from "react-icons/fi";
import { GiCrenelCrown } from "react-icons/gi";
import { HiMenu } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";

import { MdClose } from "react-icons/md";

import { Link, Outlet } from "react-router-dom";
import { UserInfoContext } from "../contexts/UserInfoContext";
import ApiManager from "../services/ApiManager";

function Navbar() {
  const { userInfo, setUserInfo, characterData, setCharacterData } =
    useContext(UserInfoContext);

  const [navBarToggled, setNavBarToggled] = useState(false);

  const handleLogOut = async () => {
    const am = ApiManager.getInstance();
    await am.get("/auth/logout");
    window.location = "/";
  };

  return (
      <>
        <div
          className={
            navBarToggled
              ? "w-screen bg-[#252525] h-screen  absolute z-50"
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
          <div className="flex flex-col items-center border-0 border-b border-solid border-secondary bg-primary">
            <GiCrenelCrown className="text-white font-bold text-4xl " />
            <h1 className="font-bold text-4xl text-white mb-2">Guild Master</h1>
          </div>
          {/* ----------------------Character data---------------------- */}
          {characterData && (
            <div>
              <div className="user-info flex m-5 mb-10 mt-10">
                {/* CHARACTER AVATAR */}
                <img
                  src={characterData.avatarUrl}
                  alt=""
                  className="rounded border-2 border-white"
                />
                <div className="text-left pl-2 text-white">
                  {characterData?.class && (
                    <p
                      className={
                        "text-" +
                        characterData?.class.toLowerCase().replaceAll(" ", "") +
                        "color font-bold text-xl"
                      }
                    >
                      {characterData?.name}
                    </p>
                  )}
                  {/* CHARACTER REALM */}
                  <p>
                    {characterData?.realm?.charAt(0).toUpperCase() +
                      characterData?.realm?.slice(1)}
                  </p>
                  {/* CHARACTER GUILD */}
                  <p className="text-[#E7B57A]">{characterData?.guildName}</p>
                  <p>Level {characterData?.level}</p>
                </div>
              </div>

              <Link
                to="my-characters"
                className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 border-b-4 border-secondary hover:border-secondary rounded transition ease-in-out "
                onClick={() => {
                  setNavBarToggled(false);
                }}
              >
                Change character
              </Link>
            </div>
          )}
          {/* ----------------------END---------------------- */}
          {/* ----------------------Link BNET---------------------- */}
          {(userInfo && !characterData && userInfo?.bnetLinked == null  && (
              <div className="mt-10 ">
                <Link
                  to="/bnet"
                  className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 border-b-4 border-secondary hover:border-secondary rounded transition ease-in-out mb-2"
                  onClick={() => {
                    setNavBarToggled(false);
                  }}
                >
                  Link Battle.net account
                </Link>
                <p className="mt-3 pb-5 text-white divide border-dashed border-b border-0">
                  To Apply to a guild and see your characters details, please
                  link your <span className="text-primary">battle.net</span>{" "}
                  account to your guildmaster.io account.
                </p>
              </div>
            ))}
            {/* ----------------------END---------------------- */}
          <ul className="mt-20 ml-10 text-white">
            {userInfo && (
              <li className="nav flex items-center text-xl cursor-pointer hover:text-primary transition ease-in-out mt-3">
                <Link to="/my-profile" className="flex items-center">
                  <CgProfile className="mr-5" />
                  Profile
                </Link>
              </li>
            )}
            <li className=" flex">
              {userInfo && characterData && (
                <div className="flex">
                  <div className="flex items-center text-xl cursor-pointer  hover:text-primary  transition ease-in-out">
                    <BiShieldQuarter className="mr-5" />
                    My Guild &nbsp;
                  </div>

                  <div className="rounded-full bg-red-500 w-7  ">2</div>
                </div>
              )}

              {!userInfo && (
                <div>
                  <div className="flex items-center text-xl cursor-pointer  hover:text-primary  transition ease-in-out">
                    <Link to="/auth/login" className="flex items-center">
                      <FiLogIn className="mr-5" />
                      Login &nbsp;
                    </Link>
                  </div>
                  <div className="flex items-center text-xl cursor-pointer  hover:text-primary  transition ease-in-out">
                    <Link to="/register" className="flex items-center">
                      <FiLogIn className="mr-5" />
                      Register &nbsp;
                    </Link>
                  </div>
                </div>
              )}
            </li>
            <li className="nav-active-link flex items-center text-xl cursor-pointer hover:text-primary transition ease-in-out ">
              <VscWorkspaceUnknown className="mr-5" />
              Find a guild
            </li>
          </ul>
          {userInfo && (
            <button
              onClick={() => {
                handleLogOut();
              }}
              className="absolute bottom-5 left-10 text-white flex items-center hover:text-primary cursor-pointer"
            >
              <FiLogOut /> &nbsp; Log out
            </button>
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
        
      </>
  );
}

export default Navbar;
