import { BsDoorClosed } from "react-icons/bs";
import loginBackground from "../assets/img/loginBackground.jpg";
import { GiCrenelCrown } from "react-icons/gi";

function loginForm() {
  return (
    <div
      className="h-screen w-full  flex items-center justify-center"
      style={{
        backgroundImage: `url("${loginBackground}")`,
        backgroundSize: "cover",
      }}
    >
      
      <div className="bg-white h-80 rounded-md  drop-shadow-md ">
        <div className="flex  flex-col items-center mb-3 w-full bg-primary rounded-t-md text-white">
          <GiCrenelCrown className="font-bold text-4xl tracking-wider mt-1" />
          <h1 className="font-bold text-4xl tracking-wider mb-3">GuildMaster</h1>
        </div>

        
        <form action="" className="grid gap-4 m-5">
          <div className=" relative ">
            <input
              type="text"
              id="rounded-email"
              className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Your email"
            />
          </div>
          <div className=" relative ">
            <input
              type="password"
              id="rounded-pwd"
              className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Your password"
            />
          </div>

          <button
            type="button"
            className="py-2 px-4 flex justify-center items-center  bg-primary hover:bg-[#2A7484] focus:ring-secondary focus:ring-offset-secondary text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full"
          >
            <BsDoorClosed className="mr-3" />
            Log in
          </button>
          <div className="mb-3">
            <div className="relative inline-block w-10 mr-2 align-middle select-none">
              <input
                type="checkbox"
                name="toggle"
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

export default loginForm;
