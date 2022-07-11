import { TbSwords } from "react-icons/tb";
import loginBackground from "../assets/img/loginBackground.jpg";
import { GiCrenelCrown } from "react-icons/gi";
import { useForm } from "react-hook-form";
function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    validateCriteriaMode: "all",
  });
  console.log(errors);

  return (
    <div
      className="h-screen w-full  flex items-center justify-center"
      style={{
        backgroundImage: `url("${loginBackground}")`,
        backgroundSize: "cover",
      }}
    >
      <div className="bg-white h-auto rounded-md  drop-shadow-md ">
        <div className="flex  flex-col items-center mb-3 w-full bg-primary rounded-t-md text-white">
          <GiCrenelCrown className="font-bold text-4xl tracking-wider mt-1" />
          <h1 className="font-bold text-4xl tracking-wider mb-3">
            GuildMaster
          </h1>
        </div>

        <form
          onSubmit={handleSubmit((data) => {
            
          })}
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
              {...register("email", { required:"Email is required" })}
            />
            <p className="text-red-300"> {errors.email?.message}</p>
          </div>
          <div className=" relative ">
            <input
              type="password"
              id="rounded-pwd"
              className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Your password"
              name="password"
            />
          </div>

          <div className=" relative ">
            <input
              type="password"
              id="rounded-pwd"
              className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Confirm password"
              name="confirmPassword"
            />
          </div>

          <button
            type="submit"
            className="py-2 px-4 flex justify-center items-center  bg-primary hover:bg-[#2A7484] focus:ring-secondary focus:ring-offset-secondary text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full"
          >
            <TbSwords className="mr-3" />
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
