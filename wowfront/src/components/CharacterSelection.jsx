import React, { useEffect, useState, useContext } from "react";
import { UserInfoContext } from "../contexts/UserInfoContext";
import ApiManager from "../services/ApiManager";
import CharacterCard from "./CharacterCard";

function CharacterSelection() {
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  const [characters, setCharacters] = useState([]);
  const [selected, setSelected] = useState("");
  useEffect(() => {
    const am = ApiManager.getInstance();

    const getCharacters = async () => {
      const chars = await am.get("/character/all-characters");
      setCharacters(chars.data);
    };

    getCharacters();
  }, []);

  return (
    <div className="bg-[#232739] w-full h-screen flex justify-center items-center ">
      <div className=" border-white border bg-mygray rounded-lg">
        <div className="grid grid-cols-4 gap-5 p-10">
          {characters &&
            characters.map((character) => {
              if (character.wowCharacterId === userInfo.selectedCharacter) {
                return;
              }
              return (
                <CharacterCard
                  key={character.id}
                  character={character}
                  passChildData={setSelected}
                  coucou="coucou"
                />
              );
            })}
        </div>
        <button
          onClick={() => {
            //TODO: CHANGE SELECTED CHARACTER ON USER TABLE ETC...
          }}
          className="bg-primary hover:bg-[#2A7484] text-white font-bold py-2 px-4 border-b-4 border-[#2A7484] hover:border-[##2A7484] rounded transition ease-in-out mb-10"
        >
          Swap to this character
        </button>
      </div>
    </div>
  );
}

export default CharacterSelection;
