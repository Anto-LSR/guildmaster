/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/anchor-has-content */
import React, { Component, useContext, useEffect, useState } from "react";
import { UserInfoContext } from "../contexts/UserInfoContext";
import ApiManager from "../services/ApiManager";
import { BsFillShieldFill } from "react-icons/bs";
import { RiSwordFill } from "react-icons/ri";
import hordeIcon from "../assets/img/hordeIcon.png";
import allianceIcon from "../assets/img/allianceIcon.png";
import raiderIcon from "../assets/img/raiderIcon.svg";
import wowprogressIcon from "../assets/img/wowprogressIcon.png";
import Spinner from "./Spinner";
import CharacterStats from "./CharacterStats";
import Tippy from "@tippyjs/react";
import CharacterMythicProgress from "./CharacterMythicProgress";

function CharacterProfile() {
  const { characterData, setCharacterData } = useContext(UserInfoContext);
  const [achievements, setAchievements] = useState("");
  const [gear, setGear] = useState("");
  const [stats, setStats] = useState("");
  useEffect(() => {
    const am = ApiManager.getInstance();
    const getCharacterDetails = async () => {
      const res = await am.get("/character/character-achievements");
      setAchievements(res.data);
    };
    const getCharacterGear = async () => {
      const res = await am.get("/character/character-gear");
      setGear(res.data);
    };
    const getStats = async () => {
      const res = await am.get("/character/character-stats");
      setStats(res.data);
    };
    getStats();
    getCharacterGear();
    getCharacterDetails();
  }, [window.refreshTooltip()]);
  return (
    <>
      {!achievements && !gear && !stats && <Spinner />}
      {achievements && gear && stats && (
        <>
          <div className="flex justify-between">
            <div className="flex items-center">
              <img
                src={
                  characterData?.faction === "Horde" ? hordeIcon : allianceIcon
                }
                alt=""
                className="object-fit h-10 mr-1"
              />
              <div className="text-start">
                <span
                  className={
                    "text-" +
                    characterData?.class.toLowerCase().replaceAll(" ", "") +
                    "color"
                  }
                >
                  {characterData?.name}
                </span>
                <p className="text-[#E7B57A]">{characterData?.guildName}</p>
              </div>
            </div>
            <div></div>
            <div className="flex flex-col justify-end">
              <div className="flex">
                <BsFillShieldFill className="font-bold text-xl text-[#e7c100] mr-1" />
                <span className="text-[#e7c100]">{achievements}</span>
              </div>
              <div className="flex">
                <RiSwordFill className="font-bold text-xl text-[#e7c100] mr-1" />
                <span className="text-[#e7c100]">{characterData?.ilvl}</span>
              </div>
            </div>
          </div>
          <hr className="my-8 h-px bg-gray-200 border-0 dark:bg-gray-700" />
          {/* STATS & GEAR */}
          <div className="bg-[#25252569] py-4">
            <div className="flex items-center justify-center">
              <img
                src={require("../assets/img/icons/specs/" +
                  characterData?.specId +
                  ".jpg")}
                alt=""
                className="h-8 bg-[#252525] rounded mr-2"
              />
              <h1
                className={
                  "text-" + characterData?.class.toLowerCase() + "color"
                }
              >
                {characterData?.activeSpec} {characterData?.class}
              </h1>
            </div>
            <div className="grid grid-cols-3">
              <div className="flex flex-col items-end whitespace-nowrap">
                {gear.map((item, i) => {
                  if (
                    item.slot.type === "HEAD" ||
                    item.slot.type === "NECK" ||
                    item.slot.type === "SHOULDER" ||
                    item.slot.type === "BACK" ||
                    item.slot.type === "CHEST" ||
                    item.slot.type === "SHIRT" ||
                    item.slot.type === "TABARD" ||
                    item.slot.type === "WRIST"
                  )
                    return (
                      <a
                        key={i}
                        href={
                          "https://www.wowhead.com/item=" +
                          item.media.id +
                          "&ilvl=" +
                          item.level.value
                        }
                      />
                    );
                })}
              </div>

              <CharacterStats props={stats} />
              <div className="">
                <div className="flex flex-col items-start whitespace-nowrap">
                  {gear.map((item, i) => {
                    if (
                      item.slot.type === "HANDS" ||
                      item.slot.type === "WAIST" ||
                      item.slot.type === "LEGS" ||
                      item.slot.type === "FEET" ||
                      item.slot.type === "FINGER_1" ||
                      item.slot.type === "FINGER_2" ||
                      item.slot.type === "TRINKET_1" ||
                      item.slot.type === "TRINKET_2"
                    )
                      return (
                        <a
                          key={i}
                          href={
                            "https://www.wowhead.com/item=" +
                            item.media.id +
                            "&ilvl=" +
                            item.level.value
                          }
                        />
                      );
                  })}
                </div>
              </div>
              <div></div>
              <div className="mt-8">
                <div className="flex justify-center whitespace-nowrap">
                  {gear.map((item, i) => {
                    if (
                      item.slot.type === "MAIN_HAND" ||
                      item.slot.type === "OFF_HAND"
                    )
                      return (
                        <a
                          key={i}
                          href={
                            "https://www.wowhead.com/item=" +
                            item.media.id +
                            "&ilvl=" +
                            item.level.value
                          }
                        />
                      );
                  })}
                </div>
              </div>
              <div></div>
            </div>
          </div>
          <hr className="my-8 h-px bg-gray-200 border-0 dark:bg-gray-700" />
          <div className="flex items-center justify-center gap-6 bg-[#25252569] py-4">
            <Tippy content="See raider.io profile">
              <a
                target="blank"
                href={
                  "https://raider.io/characters/eu/" +
                  characterData?.realm +
                  "/" +
                  characterData?.name
                }
              >
                <img className="h-6" src={raiderIcon} alt="" />
              </a>
            </Tippy>
            <Tippy content="See Warcraft-logs profile">
              <a
                className="flex items-center"
                target="blank"
                href={
                  "https://www.warcraftlogs.com/character/eu/" +
                  characterData?.realm +
                  "/" +
                  characterData?.name
                }
              >
                <img className="h-6" src={wowprogressIcon} alt="" />{" "}
                <span className="pl-1 text-lg font-wl">Warcraft Logs</span>
              </a>
            </Tippy>
          </div>
          <hr className="my-8 h-px bg-gray-200 border-0 dark:bg-gray-700" />
          <div>
            <CharacterMythicProgress />
          </div>
          <hr className="my-8 h-px bg-gray-200 border-0 dark:bg-gray-700" />
          <div>
            <h1>Block progress raid</h1>
          </div>
          <hr className="my-8 h-px bg-gray-200 border-0 dark:bg-gray-700" />
        </>
      )}
    </>
  );
}

export default CharacterProfile;
