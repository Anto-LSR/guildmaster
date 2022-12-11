import React, { useContext, useEffect, useState } from "react";
import ApiManager from "../services/ApiManager";
import Spinner from "./Spinner";
import { BiTimer } from "react-icons/bi";
import { FaDungeon } from "react-icons/fa";
import Tippy from "@tippyjs/react";
import { UserInfoContext } from "../contexts/UserInfoContext";

const CharacterMythicProgress = () => {
  const [mythicDungeons, setMythicDungeons] = useState("");
  useEffect(() => {
    const am = ApiManager.getInstance();
    const getDungeons = async () => {
      const res = await am.get("/dungeon-runs/character-runs");
      if (res.status === 204) {
        //setMythicDungeons("");
      }
      console.log(res);
      setMythicDungeons(res.data);
    };
    getDungeons();
  }, []);
  const { characterData } = useContext(UserInfoContext);
  console.log(characterData);

  return (
    <>
      {mythicDungeons && (
        <div className="bg-[#25252569] p-2">
          <div className="mb-2 mt-1 ">
            <span>Mythic score : </span>
            <span
              style={{
                color: `rgb(${characterData.mythic_rating_color})`,
              }}
            >
              {characterData.mythic_rating}
            </span>
          </div>
          <div className="grid grid-cols-8 gap-2 ">
            {mythicDungeons.map(function (run, i) {
              return (
                <div key={i}>
                  <Tippy content={run.dungeon_name + " - " + run.duration}>
                    <div
                      className=" transition ease-in-out h-32 border border-white rounded relative flex items-center justify-center hover:scale-110 hover:z-50 "
                      style={{
                        backgroundImage: `url(${run.dungeon.media})`,
                        backgroundSize: "cover",
                      }}
                    >
                      <span className="p-1 bg-[#25252575] rounded absolute top-1 left-1">
                        {run.keystone_level}
                      </span>
                      {run.is_completed_within_time === true && (
                        <span className="p-1 bg-[#25252575] text-xl text-lime-500   absolute top-1 right-1">
                          <BiTimer />
                        </span>
                      )}
                      <span
                        className="p-1 bg-[#00000090] absolute bottom-0 w-full text-xl rounded "
                        style={{
                          color: `rgb(${run.color_rating})`,
                        }}
                      >
                        {Math.round(run.rating)}
                      </span>
                    </div>
                  </Tippy>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {!mythicDungeons && mythicDungeons != "" && <Spinner />}

      {mythicDungeons === "" && (
        <div className="flex items-center justify-center bg-[#25252569] p-2">
          <FaDungeon className="text-red-500 mr-2" />
          <span> No Mythic dungeons done this season</span>
        </div>
      )}
    </>
  );
};

export default CharacterMythicProgress;
