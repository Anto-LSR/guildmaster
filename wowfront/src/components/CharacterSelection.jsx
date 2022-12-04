import React, { useEffect, useState, useContext } from "react";
import { UserInfoContext } from "../contexts/UserInfoContext";
import ApiManager from "../services/ApiManager";
import CharacterCard from "./CharacterCard";
import { AiOutlineCheck } from "react-icons/ai";
import { BiErrorCircle, BiRefresh } from "react-icons/bi";
import toast from "react-hot-toast";
import Spinner from "./Spinner";

function CharacterSelection() {
  const { userInfo, setUserInfo, characterData, setCharacterData } =
    useContext(UserInfoContext);
  const [characters, setCharacters] = useState([]);
  const [selected, setSelected] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      toast.success("Main character has been changed");
    } catch (e) {
      toast.error("Something went wrong");
      console.log(e);
    }
    setIsLoading(false);
  };

  return (
    <>
      {!isLoading && characterData && (
        <div className="flex  items-center lg:h-screen flex-col mb-24 md:mb-0">
          <div className=" border-[#ffffff5c] mt-10 lg:border lg:bg-mygray rounded-lg mb-12 drop-shadow-md">
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
                fixed bottom-5 right-1/2 translate-x-1/2 text-white font-bold py-2 px-4 border-b-4 border-secondary rounded transition ease-in-out mb-10 shadow-md
                bg-primary 
                hover:bg-secondary  hover:border-secondary 
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
                fixed bottom-7 right-4 translate-x-2/2 text-white font-bold py-2 px-4 border-b-4 border-secondary rounded transition ease-in-out mb-10 shadow-md
                bg-primary 
                font-bold text-2xl
                hover:bg-secondary  hover:border-secondary 
                md:absolute  
                lg:static lg:mr-10 lg:translate-x-0
                xl:static lg-translate-x-0
              "
          >
            <BiRefresh />
          </a>
        </div>
      )}

      {isLoading && (
        <Spinner />
      )}
    </>
  );
}

export default CharacterSelection;
