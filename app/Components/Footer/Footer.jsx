"use client";

import React from "react";
import { MdPolicy } from "react-icons/md";
// import { FaPhoneAlt } from "react-icons/fa";
import { PiAddressBookTabsBold } from "react-icons/pi";

import { FaCircleInfo } from "react-icons/fa6";
// import { FaBullhorn } from "react-icons/fa";
import { redirect } from "next/navigation";
import { MdOutlineCookie } from "react-icons/md";

const Footer = () => {
  const redirectTo = (path) => {
    path && redirect(path);
  };
  return (
    <div className=" fixed bottom-0 left-0 w-full bg-yellow_1 flex py-6 text-3xl justify-around text-purple_1 ">
      <div onClick={() => redirectTo("/kontakt")} title="Kontakt" className="cursor-pointer flex justify-center items-center rounded-full w-12 h-12 shadow-sm shadow-purple_1 hover:scale-110 transition-all duration-300 ease-in-out bg-white">
        <PiAddressBookTabsBold />
      </div>
      <div title="Info"
              onClick={() => redirectTo("/info")}

      className="cursor-pointer flex justify-center items-center rounded-full w-12 h-12 shadow-sm shadow-purple_1 hover:scale-110 transition-all duration-300 ease-in-out bg-white">
        <FaCircleInfo />
      </div>
      <div
      title="GDPR"
        onClick={() => redirectTo("/integritetspolicy")}
        className="cursor-pointer flex justify-center items-center rounded-full w-12 h-12 shadow-sm shadow-purple_1 hover:scale-110 transition-all duration-300 ease-in-out bg-white"
      >
        <MdPolicy />
      </div>
      {/* <div title="Visselblåsaren" className="cursor-pointer flex justify-center items-center rounded-full w-12 h-12 shadow-sm shadow-purple_1 hover:scale-110 transition-all duration-300 ease-in-out bg-white">
        <FaBullhorn />
      </div> */}

      <div title="Cookies" className="cursor-pointer flex justify-center items-center rounded-full w-12 h-12 shadow-sm shadow-purple_1 hover:scale-110 transition-all duration-300 ease-in-out bg-white">
        <a href="#" onClick="UC_UI.showSecondLayer();">
          <MdOutlineCookie />
        </a>
      </div>
    </div>
  );
};

export default Footer;
