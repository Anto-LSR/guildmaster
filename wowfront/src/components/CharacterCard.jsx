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
            " bg-opacity text-white border-double shadow-md  rounded-md   lg:w-60 w-32 md:w-44 items-center   hover:outline-primary  hover:outline-double hover:outline-offset-2 hover:outline-3 cursor-pointer focus:border-primary focus:outline focus:outline-primary "
          }
        >
          <div>
            <img
              className=" hidden  lg:block rounded-l-md"
              src={character.avatarUrl}
              alt=""
            />
          </div>
          <div className="text-start p-2">
            <p
              className={
                "text-" +
                character.class.toLowerCase().replaceAll(" ", "") +
                "color font-bold"
              }
            >
              {character.name}
            </p>
            <p>
              {character.realm.charAt(0).toUpperCase() +
                character.realm.slice(1)}
            </p>
            <p>Level {character.level}</p>
          </div>
        </button>
      )}
    </div>
  );
}

export default CharacterCard;
