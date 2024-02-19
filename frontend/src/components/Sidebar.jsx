import React, { useState, useEffect } from "react";
import { GoHome } from "react-icons/go";
import { PiNotePencil } from "react-icons/pi";
import { IoDocumentTextOutline, IoPersonOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const navLinks = [
    {
      name: "Home",
      path: "/dashboard",
      icon: GoHome,
    },
    {
      name: "Jobs",
      path: "/jobs",
      icon: PiNotePencil,
    },
    {
      name: "Resumes",
      path: "/resumes",
      icon: IoDocumentTextOutline,
    },
    {
      name: "Account",
      path: "/account",
      icon: IoPersonOutline,
    },
  ];

  const [activeLink, setActiveLink] = useState(navLinks[0].name);
  return (
    <>
      <div className="z-[200] bg-card  absolute left-0 top-0 w-[275px] h-[100dvh] flex flex-col justify-start items-start py-8  border-border border-solid">
        <h3 className="text-white font-bold text-[28px] text-center mb-10 px-8">
          Resu<span className="text-tertiary">Match</span>
        </h3>
        <div className="flex flex-col justify-between w-full">
          <div className="w-full">
            {navLinks.slice(0, 3).map((link, index) => {
              const { path, name, icon: IconComponent } = link;
              return (
                <Link to={path} key={index} className="w-full">
                  <div
                    className={`flex items-center justify-start w-[100%] py-2 px-4 gap-4 hover:bg-[#bfbfbf] cursor-pointer text-[24px]  hover:text-tertiary transition-all duration-[350ms] font-medium text-[#Bfbfbf] hover:bg-opacity-10 ${
                      activeLink === name
                        ? "bg-[#bfbfbf] bg-opacity-10 border-r-[4px] rounded-l-md border-solid border-tertiary text-tertiary"
                        : ""
                    }`}
                    onClick={() => setActiveLink(name)}
                  >
                    <IconComponent />
                    <div>{name}</div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="w-full">
            {navLinks.slice(3, 4).map((link, index) => {
              const { path, name, icon: IconComponent } = link;
              return (
                <Link to={path} key={index} className="w-full">
                  <div
                    className={`flex items-center justify-start w-[100%] py-2 px-4 gap-4 hover:bg-[#bfbfbf] cursor-pointer text-[24px]  hover:text-tertiary transition-all duration-[350ms] font-medium text-[#Bfbfbf] hover:bg-opacity-10 ${
                      activeLink === name
                        ? "bg-[#bfbfbf] bg-opacity-10 border-r-[4px] rounded-l-md border-solid border-tertiary text-tertiary"
                        : ""
                    }`}
                    onClick={() => setActiveLink(name)}
                  >
                    <IconComponent />
                    <div>{name}</div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* <Link to={navLinks[3].path} key={navLinks[3].path} className="w-full">
            <div
              className={`flex items-center justify-start w-[100%] py-2 px-4 gap-4 hover:bg-[#bfbfbf] cursor-pointer text-[24px]  hover:text-tertiary transition-all duration-[350ms] font-medium text-[#Bfbfbf] hover:bg-opacity-10 ${
                activeLink === navLinks[3].name
                  ? "bg-[#bfbfbf] bg-opacity-10 border-r-[4px] rounded-l-md border-solid border-tertiary text-tertiary"
                  : ""
              }`}
              onClick={() => setActiveLink(navLinks[3].name)}
            >
              <IconComponent />
              <div>{name}</div>
            </div>
          </Link> */}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
