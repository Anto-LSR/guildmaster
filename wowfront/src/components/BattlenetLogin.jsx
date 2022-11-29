import React from "react";
import { Component } from "react";
import axios from "axios";

function BattlenetLogin() {
  return (
    <div className="bg-white dark:bg-gray-800 w-full flex items-center h-screen ">
      <div className="text-center w-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
        <h2 className="text-3xl font-extrabold text-black dark:text-white sm:text-4xl">
          <span className="block">Guild Master</span>
          <span className="block text-indigo-500">
            Link battle net to my gm.gg account
          </span>
        </h2>
        <p className="text-xl mt-4 max-w-md mx-auto text-gray-400">
          GuildMaster will have access to your guilds and characters
          informations, no personal data is stored in our database !
        </p>
        <div className="lg:mt-0 lg:flex-shrink-0">
          <div className="mt-12 inline-flex rounded-md shadow">
            <a
              href={`https://eu.battle.net/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_BASEURL}/bnet&response_type=code&scope=wow.profile`}
              className="py-4 px-6  bg-primary border-2 border-secondary hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            >
              Link battle net account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BattlenetLogin;
