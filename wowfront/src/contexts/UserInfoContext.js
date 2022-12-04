import React, { useState, useEffect, createContext } from "react";
import ApiManager from "../services/ApiManager";
import { Helpers } from "../services/Helpers.js";

export const UserInfoContext = createContext();

function UserInfoContextProvider(props) {
  const [userInfo, setUserInfo] = useState(null);
  const [characterData, setCharacterData] = useState(null);
  const [hasSelectedCharacter, setHasSelectedCharacter] = useState(false);

  useEffect(() => {
    const am = ApiManager.getInstance();
    if (Helpers.isAuthenticated()) {
      const fetchUserInfo = async () => {
        const user = await am.post("/auth/get-user");
        setUserInfo(user.data);
        if (user.data.selectedCharacter !== null && user.data.selectedCharacter !== undefined) {
          fetchCharacterInfo();
          setHasSelectedCharacter(true);
        } else {
        }
      };

      const fetchCharacterInfo = async () => {
        const character = await am.get("/character/character-info");
        setCharacterData(character.data);
      };

      fetchUserInfo();
    }
  }, []);
  const value = { userInfo, setUserInfo, characterData, setCharacterData };
  return (
    <UserInfoContext.Provider value={value}>
      {props.children}
    </UserInfoContext.Provider>
  );
}

export default UserInfoContextProvider;
