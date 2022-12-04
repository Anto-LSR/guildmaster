import React, { useContext, useEffect, useState } from "react";
import { UserInfoContext } from "../contexts/UserInfoContext";
import ApiManager from "../services/ApiManager";
import Spinner from "./Spinner";
import { BiTimer } from "react-icons/bi";
import Tippy from "@tippyjs/react";

const CharacterMythicProgress = () => {
  const { characterData, setCharacterData } = useContext(UserInfoContext);
  const [mythicDungeons, setMythicDungeons] = useState("");
  useEffect(() => {
    const am = ApiManager.getInstance();
    const getDungeons = async () => {
      const res = await am.get("/character/character-mythic-dungeons");
      console.log(res.data);
      setMythicDungeons(res.data);
    };
    getDungeons();
    //console.log(mythicDungeons);
  }, []);
  return (
    <>
      {mythicDungeons && (
        <div className="bg-[#25252569] p-2">
          <div className="mb-2 mt-1 ">
            <span>Mythic score : </span>
            <span
              style={{
                color: `rgb(${
                  mythicDungeons.mythic_rating.color.r +
                  "," +
                  mythicDungeons.mythic_rating.color.g +
                  "," +
                  mythicDungeons.mythic_rating.color.b
                })`,
              }}
            >
              {mythicDungeons.mythic_rating.rating}
            </span>
          </div>
          <div className="grid grid-cols-8 gap-2 ">
            {mythicDungeons.best_runs.map(function (run, i) {
              return (
                <div key={i}>
                  <Tippy content={run.dungeon.name + " - " + run.duration}>
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
                          color: `rgb(${
                            run.map_rating.color.r +
                            "," +
                            run.map_rating.color.g +
                            "," +
                            run.map_rating.color.b
                          })`,
                        }}
                      >
                        {Math.round(run.map_rating.rating)}
                      </span>
                    </div>
                  </Tippy>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {!mythicDungeons && <Spinner />}
    </>
  );
};

export default CharacterMythicProgress;
