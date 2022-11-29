import { UserInfoContext } from "../contexts/UserInfoContext";
import { useContext } from "react";
import battlenet from "../assets/img/battlenet.png";

function UserProfile() {
  const { userInfo, setUserInfo, characterData, setCharacterData } =
    useContext(UserInfoContext);
  console.log(characterData);
  return (
    //Container
    <div className="h-full flex items-center justify-center flex-col">
      {/* Content wrapper */}
      {/* -------------DESKTOP------------- */}
      <div className="border-[#ffffff5c] border bg-mygray text-white md:w-3/4 flex justify-between rounded-md md:mt-0 mt-10 hidden md:flex">
        <div id="bnet" className="p-3">
          <div className="flex items-center text-start">
            <img
              src={battlenet}
              alt="battlenet"
              className="w-20 h-20  hidden md:block"
            />
            <div>
              <h3 className="mb-3 hidden md:block">BATTLETAG</h3>
              <p className="text-md">{userInfo?.battleTag.toUpperCase()}</p>
            </div>
          </div>
        </div>

        <div id="mail" className="flex items-center p-3 mr-4">
          <div className="flex flex-col">
            <p className="text-md">{userInfo?.email.toUpperCase()}</p>
            <button className="bg-primary hover:bg-secondary text-white font-bold py-1 px-2 border-b-4 border-secondary hover:border-secondary rounded transition ease-in-out ">
              Change my email
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 border-[#ffffff5c] border bg-mygray text-white md:w-3/4  justify-between p-3 rounded-md md:flex hidden">
        <button className="bg-primary hover:bg-secondary text-white font-bold py-1 px-2 border-b-4 border-secondary hover:border-secondary rounded transition ease-in-out ">
          Change my password
        </button>
        <button className="bg-primary hover:bg-secondary text-white font-bold py-1 px-2 border-b-4 border-secondary hover:border-secondary rounded transition ease-in-out ">
          Refresh my characters
        </button>
        <button className="bg-red-700 hover:bg-red-900 text-white font-bold py-1 px-2 border-b-4 border-red-900 hover:border-secondary rounded transition ease-in-out ">
          Delete my account
        </button>
      </div>
      <div className="h-3/4 mt-8 border-[#ffffff5c] border bg-mygray text-white md:w-3/4 flex justify-between rounded-md hidden md:block">
        <div
          style={{
            backgroundImage: `url("${characterData?.mainPictureUrl}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="w-full h-full rounded-md"
        ></div>
      </div>
      {/* -------------DESKTOP------------- */}
      {/* -------------MOBILE------------- */}

      {/* -------------MOBILE------------- */}
    </div>
  );
}

export default UserProfile;
