import loginBackground from "../assets/img/loginBackground.jpg";
import { BsDoorClosed, BsFillExclamationCircleFill } from "react-icons/bs";
import { GiCrenelCrown } from "react-icons/gi";

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ApiManager from "../services/ApiManager";
import { UserInfoContext } from "../contexts/UserInfoContext";

function LoginForm() {
  const { userInfo, setUserInfo} =
    useContext(UserInfoContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    validateCriteriaMode: "all",
  });
  const onSubmit = async (data, e) => {
    if (Object.entries(errors).length === 0) {
      const am = ApiManager.getInstance();
      let response = await am.post("/auth/login", data);
      if (response.status === 202) {
        console.log(response.status);

        let data = await am.post("/auth/get-user");
        const user = data.data;
        setUserInfo(user);
        window.location='/'
      }
    }
  };

  return (
    <div
      className="h-screen w-full  flex items-center justify-center bg-secondary"
      // style={{
      //   backgroundImage: `url("${loginBackground}")`,
      //   backgroundSize: "cover",
      // }}
    >
      <div className="bg-white h-auto rounded-md drop-shadow-md w-96">
        <div className="flex  flex-col items-center mb-3 w-full bg-primary rounded-t-md text-white">
          <GiCrenelCrown className="font-bold text-4xl tracking-wider mt-1" />
          <h1 className="font-bold text-4xl tracking-wider mb-3">
            GuildMaster
          </h1>
        </div>

        <form
          action=""
          className="grid gap-4 m-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className=" relative ">
            <input
              type="text"
              id="rounded-email"
              className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Your email"
              {...register("email", {
                required: "Email is required",
                pattern:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              })}
            />
            {errors.email?.type === "pattern" && (
              <div className="text-red-300 flex mt-1">
                <BsFillExclamationCircleFill className="mt-1 mr-1" />
                <p> This email is not valid</p>
              </div>
            )}
          </div>
          <div className=" relative ">
            <input
              type="password"
              id="rounded-pwd"
              className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Your password"
              {...register("password", {
                required: "You must specify a password",
                minLength: {
                  value: 8,
                  message: "Password must have at least 8 characters",
                },
              })}
            />
          </div>

          <button
            type="submit"
            className="py-2 px-4 flex justify-center items-center  bg-primary hover:bg-[#2A7484] focus:ring-secondary focus:ring-offset-secondary text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full"
          >
            <BsDoorClosed className="mr-3" />
            Log in
          </button>
          <div className="mb-3">
            <div className="relative inline-block w-10 mr-2 align-middle select-none">
              <input
                type="checkbox"
                id="Blue"
                className="checked:bg-primary outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
              />
              <label
                htmlFor="Blue"
                className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
              ></label>
            </div>
            <span className="text-gray-400 font-medium">Remember me</span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
