import React, { useEffect, useState, useContext } from "react";
import { UserInfoContext } from "../contexts/UserInfoContext";
import ApiManager from "../services/ApiManager";
import CharacterCard from "./CharacterCard";
import { AiOutlineCheck } from "react-icons/ai";
import { BiErrorCircle, BiRefresh } from "react-icons/bi";

function CharacterSelection() {
  const { userInfo, setUserInfo, characterData, setCharacterData } =
    useContext(UserInfoContext);
  const [characters, setCharacters] = useState([]);
  const [selected, setSelected] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [swapResult, setSwapResult] = useState("");

  useEffect(() => {
    const am = ApiManager.getInstance();

    const getCharacters = async () => {
      const chars = await am.get("/character/all-characters");
      setCharacters(chars.data);
    };

    getCharacters();
  }, []);

  const handleSelectedChange = async () => {
    setIsLoading(true);
    const am = ApiManager.getInstance();
    console.log("Changement de personnage : ", selected);
    const body = {
      wowCharacterId: selected,
    };
    try {
      let character = await am.post("/character/set/selected-character", body);
      console.log(character.data, "FROM CHARACTER SELECTION");
      setCharacterData(character.data);
      setSwapResult("success");
    } catch (e) {
      setSwapResult("error");
      console.log(e);
    }
    setIsLoading(false);
  };

  return (
    <div>
      {!isLoading && characterData && (
        <div className="flex justify-center items-center lg:h-screen flex-col">
          <div className=" border-[#ffffff5c] mt-10 lg:border lg:bg-mygray rounded-lg mb-36 drop-shadow-md">
            <div className="grid grid-cols-2 md:grid-cols-3  gap-5 lg:p-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {characters &&
                userInfo &&
                characters.map((character) => {
                  return (
                    <CharacterCard
                      key={character.id}
                      character={character}
                      passChildData={setSelected}
                    />
                  );
                })}
            </div>
          </div>
          {/* SWAP BUTTON */}
          <button
            onClick={() => {
              if (selected !== "") {
                handleSelectedChange();
              }
            }}
            className="
                fixed bottom-5 right-1/2 translate-x-1/2 text-white font-bold py-2 px-4 border-b-4 border-[#2A7484] rounded transition ease-in-out mb-10 shadow-md
                bg-primary 
                hover:bg-[#2A7484]  hover:border-[##2A7484] 
                md:absolute md:translate-x-1/2 md:right-1/2 
                lg:static lg:mr-10 lg:translate-x-0
                xl:static lg-translate-x-0
              "
          >
            Swap to this character
          </button>
          {/* REFRESH BUTTON */}
          <a
            href={`https://eu.battle.net/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_BASEURL}/bnet&response_type=code&scope=wow.profile`}
            className="
                fixed bottom-7 right-4 translate-x-2/2 text-white font-bold py-2 px-4 border-b-4 border-[#2A7484] rounded transition ease-in-out mb-10 shadow-md
                bg-primary 
                font-bold text-2xl
                hover:bg-[#2A7484]  hover:border-[##2A7484] 
                md:absolute md:translate-x-1/2 md:right-1/2 
                lg:static lg:mr-10 lg:translate-x-0
                xl:static lg-translate-x-0
              "
          >
            <BiRefresh />
          </a>
          {swapResult === "success" && (
            <div
              className="p-2 bg-green-800 items-center text-green-100 leading-none lg:rounded-full flex lg:inline-flex drop-shadow-md fixed bottom-0 md:static md:mr-9"
              role="alert"
            >
              <span className="flex rounded-full bg-green-500 uppercase px-2 py-1 text-xs font-bold mr-3">
                <AiOutlineCheck className="font-bold text-xl" />
              </span>
              <span className="font-semibold mr-2 text-left flex-auto">
                Your selected character has been changed.
              </span>
            </div>
          )}

          {swapResult === "error" && (
            <div
              className="p-2 bg-red-800 items-center text-red-100 leading-none lg:rounded-full flex lg:inline-flex drop-shadow-md md:mr-9"
              role="alert"
            >
              <span className="flex rounded-full bg-red-500 uppercase px-2 py-1 text-xs font-bold mr-3">
                <BiErrorCircle className="font-bold text-xl" />
              </span>
              <span className="font-semibold mr-2 text-left flex-auto">
                Something went wrong
              </span>
            </div>
          )}
        </div>
      )}

      {isLoading && (
        <div className="">
          <div
            role="status "
            className="h-screen flex justify-center items-center"
          >
            <svg
              className="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default CharacterSelection;
