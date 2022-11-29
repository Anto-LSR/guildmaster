import { AiOutlineCheck } from "react-icons/ai";
import { BiErrorCircle } from "react-icons/bi";
import React, { useState, useEffect } from "react";

function Toast(props){
  const [showElement, setShowElement] = React.useState(true);
  useEffect(() => {
    setTimeout(function () {
      setShowElement(false);
    }, 2000);
  }, []);
    return(
        <div
              className={`p-2 ${props.status === "success" ? 'bg-green-800' : 'bg-red-800'}  ${showElement ? '' : 'fade-out'} fade-in items-center text-green-100 leading-none lg:rounded-full flex lg:inline-flex drop-shadow-md fixed bottom-0 md:static md:mr-9`}
              role="alert"
            >
            {props.status === "success" && (
                <span className="flex rounded-full bg-green-500 uppercase px-2 py-1 text-xs font-bold mr-3">
                <AiOutlineCheck className="font-bold text-xl" />
              </span>
            )}
            {props.status === "error" && (
                <span className="flex rounded-full bg-red-500 uppercase px-2 py-1 text-xs font-bold mr-3">
                <BiErrorCircle className="font-bold text-xl" />
              </span>
            )}
              <span className="font-semibold mr-2 text-left flex-auto">
                {props.message}
              </span>
            </div>
    )
}

export default Toast;