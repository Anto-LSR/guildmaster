import React from "react";
import { Component } from "react";
import axios from "axios";

export default class BattlenetLogin extends Component {
  async componentDidMount() {
    let test = await axios.get("http://localhost:3000/user-info", {
      withCredentials: true,
    });
    console.log(test.data);
  }

  render() {
    return (
      <div className="bg-white dark:bg-gray-800 w-full flex items-center h-screen ">
        <div className="text-center w-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
          <h2 className="text-3xl font-extrabold text-black dark:text-white sm:text-4xl">
            <span className="block">Guild Master</span>
            <span className="block text-indigo-500">Gérer/Trouver une guilde</span>
          </h2>
          <p className="text-xl mt-4 max-w-md mx-auto text-gray-400">
            GuildMaster est un outil de gestion de guilde pour World of
            Warcraft. Il permet aux joueurs de gérer les apply à leurs guildes
            ou de postuler à une guilde.
          </p>
          <div className="lg:mt-0 lg:flex-shrink-0">
            <div className="mt-12 inline-flex rounded-md shadow">
              <a
                href="https://eu.battle.net/oauth/authorize?client_id=52ca743814104e579461de2c112f232e&redirect_uri=http://localhost:3000/user-login&response_type=code&scope=wow.profile"
                className="py-4 px-6  bg-[#5e90f1] border-2 border-[#68a0ff] hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
              >
                Se connecter avec BattleNet
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
