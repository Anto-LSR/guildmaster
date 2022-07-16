import { UserInfoContext } from "../contexts/UserInfoContext";
import { useContext, useState } from "react";

function CharacterCard({ character, passChildData }) {
  const { userInfo, setUserInfo } = useContext(UserInfoContext);

  return (
    <div>
      {userInfo && (
        <button
          onClick={() => {
            passChildData(character.wowCharacterId);
          }}
          className={
            "flex bg-" +
            character.faction.toLowerCase() +
            " bg-opacity text-white border-2 rounded-md border-white-500  lg:w-44 w-32 md:w-44 items-center pl-2 hover:border-primary cursor-pointer focus:border-primary focus:outline focus:outline-primary "
          }
        >
          <div>
            <img
              className=" hidden border-white lg:block"
              src={character.avatarUrl}
              alt=""
            />
          </div>
          <div className="text-start p-2">
            <p
              className={
                "text-" +
                character.class.toLowerCase().replaceAll(" ", "") +
                "color"
              }
            >
              {character.name}
            </p>
            <p>
              {character.realm.charAt(0).toUpperCase() +
                character.realm.slice(1)}
            </p>
            <p>{character.level}</p>
          </div>
        </button>
      )}
    </div>
  );
}

export default CharacterCard;
