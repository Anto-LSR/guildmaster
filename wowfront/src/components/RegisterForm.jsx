/*Project imports*/
import ApiManager from "../services/ApiManager";
import loginBackground from "../assets/img/loginBackground.jpg";
/*Icons import*/
import { Link } from "react-router-dom";
import { TbSwords } from "react-icons/tb";
import { GiAxeInLog, GiCrenelCrown } from "react-icons/gi";
import { BsFillExclamationCircleFill } from "react-icons/bs";
import { AiFillCheckCircle } from "react-icons/ai";
/*React imports*/
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    validateCriteriaMode: "all",
  });

  let [status, setStatus] = useState("");
  const password = useRef({});
  password.current = watch("password", "");

  /**
   * Handles form submit
   * @param {*} data
   */
  const onSubmit = async (data) => {
    if (Object.entries(errors).length === 0) {
      const am = ApiManager.getInstance();
      let response = await am.post("/register", data);
      setStatus(response.data.status);
    }
  };

  return (
    <div
      className="h-screen w-full  flex items-center justify-center"
      style={{
        backgroundImage: `url("${loginBackground}")`,
        backgroundSize: "cover",
      }}
    >
      <div className="bg-white h-auto rounded-md  drop-shadow-md w-96">
        <div className="flex  flex-col items-center mb-3 w-full bg-primary rounded-t-md text-white">
          <GiCrenelCrown className="font-bold text-4xl tracking-wider mt-1" />
          <h1 className="font-bold text-4xl tracking-wider mb-3">
            GuildMaster
          </h1>
        </div>
        {status === "ok" && (
          <div
            className="flex items-center bg-green-200 text-green-600 text-sm font-bold px-4 py-3"
            role="alert"
          >
            <AiFillCheckCircle className="fill-green-600" />
            <p className="font-bold text-green-600 ml-2">
              Registration confirmed !
            </p>
          </div>
        )}
        {status === "error" && (
          <div
            className="flex items-center bg-red-500 text-white text-sm font-bold px-4 py-3"
            role="alert"
          >
            <BsFillExclamationCircleFill className="fill-red-200" />
            <p className="font-bold  ml-2">Something went wrong...</p>
          </div>
        )}
        {(status === "" || status === "error") && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            action={process.env.REACT_APP_BASEURL + "/register"}
            className="grid gap-4 m-5"
            method="POST"
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
              {/* <p className="text-red-300"> {errors.email?.message}</p> */}
              {errors.email?.type === "pattern" && (
                <div className="text-red-300 flex">
                  <BsFillExclamationCircleFill className="mt-1 mr-1" />
                  <p> This email is not valid</p>
                </div>
              )}
              {errors.email?.type === "required" && (
                <p className="text-red-300">Email is required</p>
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
              {errors.password && (
                <div className="text-red-300 flex">
                  <BsFillExclamationCircleFill className="mt-1 mr-1" />
                  <p> {errors.password.message}</p>
                </div>
              )}
            </div>

            <div className=" relative ">
              <input
                type="password"
                id="rounded-cpwd"
                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Confirm password"
                {...register("passwordRepeat", {
                  validate: (value) =>
                    value === password.current || "The passwords do not match",
                })}
              />
              {errors.passwordRepeat && (
                <div className="text-red-300 flex">
                  <BsFillExclamationCircleFill className="mt-1 mr-1" />
                  <p> {errors.passwordRepeat.message}</p>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="py-2 px-4 flex justify-center items-center  bg-primary hover:bg-[#2A7484] focus:ring-secondary focus:ring-offset-secondary text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full"
            >
              <TbSwords className="mr-3" />
              Register
            </button>
          </form>
        )}

        {status === "ok" && (
          <div>
            <p className="text-center text-gray-600 font-bold mt-5 mb-5">
              You can now login to your account
            </p>

            <div className="flex items-center justify-center">
              <Link
                to="/login"
                className="py-2 px-4 flex justify-center items-center  bg-primary hover:bg-[#2A7484] focus:ring-secondary focus:ring-offset-secondary text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 m-2"
              >
                Login{" "}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RegisterForm;
